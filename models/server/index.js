const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const { socketCtrl } = require('../../sockets');

class Server {

  constructor() {

    // Propiedades
    this.app = express();
    this.port = process.env.PORT || 5001;
    this.server = http.createServer(this.app);
    this.io = socketIo(this.server);

    this.paths = {}

    // Middlewares
    this.middlewares();

    // Rutas
    this.routes();

    // Sockets
    this.sockets();
  }

  middlewares() {

    // Habilitar Cors
    this.app.use(cors());

    // Permite servir archivos estaticos. 
    this.app.use(express.static('public'));

  }

  routes() {

  }

  sockets() {

    this.io.on('connection', socketCtrl);

  }

  listen() {

    this.server.listen(this.port, () => {
      console.log(`The server is running on port ${this.port}`);
    });

  }

}

module.exports = Server