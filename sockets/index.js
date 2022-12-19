const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

module.exports = {

  socketCtrl: (socket) => {

    socket.emit('last-ticket', ticketControl.last);
    socket.emit('actual-state', ticketControl.last4);
    socket.emit('pending-tickets', ticketControl.tickets.length);

    socket.on('next-ticket', (payload, callback) => {

      const nextTicketAssigned = ticketControl.assignNextTicket();
      callback(nextTicketAssigned);
      socket.broadcast.emit('pending-tickets', ticketControl.tickets.length);

    });

    socket.on('attend-ticket', ({ desk }, callback) => {

      if (!desk) {
        return callback({
          status: false,
          msg: 'the desk is required'
        });
      }

      const ticket = ticketControl.attendTicket(desk);

      socket.broadcast.emit('actual-state', ticketControl.last4);
      socket.emit('pending-tickets', ticketControl.tickets.length);
      socket.broadcast.emit('pending-tickets', ticketControl.tickets.length);

      if (!ticket) {
        return callback({
          status: false,
          msg: 'There are no pending tickets'
        });
      } else {
        return callback({
          status: true,
          msg: '',
          ticket
        });
      }

    });

  }

};
