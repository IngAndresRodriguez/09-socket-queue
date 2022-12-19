const labelDesk = document.querySelector('h1');
const attendTicket = document.querySelector('button');
const labelticket = document.querySelector('small');
const alert = document.querySelector('.alert');
const laberPendientes = document.querySelector('#laberPendientes');

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('desk')) {
  window.location = "index.html"
  throw new Error('The desk is requireed');
}

const desk = searchParams.get('desk');
labelDesk.innerText = desk;

alert.style.display = 'none';

const socket = io();

socket.on('connect', () => {

  // console.log('Conectado');
  attendTicket.disabled = false;

});

socket.on('disconnect', () => {

  // console.log('Desconectado del servidor');
  attendTicket.disabled = true;

});

socket.on('pending-tickets', (pending) => {
  if (pending === 0) {
    laberPendientes.style.display = 'none';
  } else {
    laberPendientes.style.display = '';
  }
  laberPendientes.innerText = pending;
});

attendTicket.addEventListener('click', () => {

  socket.emit('attend-ticket', { desk }, ({ status, msg, ticket }) => {

    if (!status) {
      labelticket.innerText = `Nadie`;
      return alert.style.display = '';
    }

    labelticket.innerText = `Ticket ${ticket.number}`;

  });

});