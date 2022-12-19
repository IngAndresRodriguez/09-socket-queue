const labelTicket1 = document.querySelector('#labelTicket1');
const labelEscritorio1 = document.querySelector('#labelEscritorio1');
const labelTicket2 = document.querySelector('#labelTicket2');
const labelEscritorio2 = document.querySelector('#labelEscritorio2');
const labelTicket3 = document.querySelector('#labelTicket3');
const labelEscritorio3 = document.querySelector('#labelEscritorio3');
const labelTicket4 = document.querySelector('#labelTicket4');
const labelEscritorio4 = document.querySelector('#labelEscritorio4');

const socket = io();

socket.on('actual-state', (payload) => {

  const audio = new Audio('../audio/new-ticket.mp3')
  audio.play();

  const [ticket1, ticket2, ticket3, ticket4] = payload;

  if (ticket1) {
    labelTicket1.innerText = 'Ticket ' + ticket1.number;
    labelEscritorio1.innerText = ticket1.desk;
  }

  if (ticket2) {
    labelTicket2.innerText = 'Ticket ' + ticket2.number;
    labelEscritorio2.innerText = ticket2.desk;
  }

  if (ticket3) {
    labelTicket3.innerText = 'Ticket ' + ticket3.number;
    labelEscritorio3.innerText = ticket3.desk;
  }

  if (ticket4) {
    labelTicket4.innerText = 'Ticket ' + ticket4.number;
    labelEscritorio4.innerText = ticket4.desk;
  }

});
