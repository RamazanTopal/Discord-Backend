const authSocket = require('./middlewares/authSocket');
const { setSocketServerInstance, getOnlineUsers } = require('./serverStore');
const disconnectHandler = require('./socketHandlers/disconnectHandler');
const newConnectionHandler = require('./socketHandlers/newConnectionHandler');
const directMessageHandler = require('./socketHandlers/directMessageHandler');
const directChatHistoryHandler = require('./socketHandlers/directChatHistoryHandler');

const registerSocketServer = (server) => {
  // eslint-disable-next-line global-require
  const io = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  setSocketServerInstance(io);

  io.use((socket, next) => {
    authSocket(socket, next);
  });

  const emitOnlineUsers = () => {
    const onlineUsers = getOnlineUsers();
    io.emit('online-users', { onlineUsers });
  };

  io.on('connection', (socket) => {
    newConnectionHandler(socket, io);
    emitOnlineUsers();
    socket.on('direct-message', (data) => {
      directMessageHandler(socket, data);
    });
    socket.on('direct-chat-history', (data) => {
      directChatHistoryHandler(socket, data);
    });
    socket.on('disconnect', () => {
      disconnectHandler(socket);
    });
  });

  setInterval(() => {
    emitOnlineUsers();
  }, [8000]);
};
module.exports = {
  registerSocketServer,
};
