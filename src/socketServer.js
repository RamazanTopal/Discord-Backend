const registerSocketServer = (server) => {
  // eslint-disable-next-line global-require
  const io = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('user connected');
    console.log('socketId', socket.id);
  });
};
module.exports = {
  registerSocketServer,
};
