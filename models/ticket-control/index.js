const path = require('path');
const fs = require('fs');

class Ticket {

  constructor(number, desk) {
    this.number = number;
    this.desk = desk;
  }

}

class TicketsControl {

  constructor() {

    this.last = 0;
    this.today = new Date().getDate();
    this.tickets = [];
    this.last4 = [];

    this.init();

  }

  get toJson() {
    return {
      last: this.last,
      today: this.today,
      tickets: this.tickets,
      last4: this.last4
    }
  }

  init() {

    const { last, today, tickets, last4 } = require('../../database/db.json');

    if (today === this.today) {

      this.last = last;
      this.tickets = tickets;
      this.last4 = last4;

    } else {

      this.saveDatabase();

    }

  }

  saveDatabase() {

    const pathDatabase = path.join(__dirname, '../../database/db.json');
    fs.writeFileSync(pathDatabase, JSON.stringify(this.toJson, null, 2));

  }

  assignNextTicket() {

    this.last += 1;

    const ticket = new Ticket(this.last, null);
    this.tickets.push(ticket);

    this.saveDatabase();

    return 'Ticket ' + ticket.number;

  }

  attendTicket(desk) {

    if (this.tickets.length === 0) {
      return null;
    }

    const ticket = this.tickets.shift();
    ticket.desk = desk;

    this.last4.unshift(ticket);

    if (this.last4.length > 4) {
      this.last4.splice(-1, 1);
    }

    this.saveDatabase();

    return ticket;

  }

}

module.exports = TicketsControl;
