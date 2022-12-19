const newTicket = document.querySelector('#nuevoTicket');
const createTicket = document.querySelector('button');

const socket = io();

socket.on('connect', () => {

  // console.log('Conectado');
  createTicket.disabled = false;

});

socket.on('disconnect', () => {

  // console.log('Desconectado del servidor');
  createTicket.disabled = true;

});

socket.on('enviar-mensaje', (payload) => {
  console.log(payload)
});

socket.on('last-ticket', (lastTicket) => {
  newTicket.innerText = 'Ticket ' + lastTicket;
});


createTicket.addEventListener('click', () => {

  socket.emit('next-ticket', null, (ticket) => {
    newTicket.innerText = ticket;
  });

});