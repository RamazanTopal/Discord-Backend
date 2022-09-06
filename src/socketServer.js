const authSocket = require('./middlewares/authSocket');
const disconnectHandler = require('./socketHandlers/disconnectHandler');
const newConnectionHandler = require('./socketHandlers/newConnectionHandler');

const registerSocketServer = (server) => {
  // eslint-disable-next-line global-require
  const io = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.use((socket, next) => {
    authSocket(socket, next);
  });
  io.on('connection', (socket) => {
    newConnectionHandler(socket, io);
    socket.on('disconnect', () => {
      disconnectHandler(socket);
    });
  });
};
module.exports = {
  registerSocketServer,
};
