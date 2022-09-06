const serverStore = require('../serverStore');

// eslint-disable-next-line no-unused-vars
const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;
  serverStore.addNewConnectedUser({
    socketId: socket.id,
    // eslint-disable-next-line no-underscore-dangle
    userId: userDetails._doc._id,
  });
};

module.exports = newConnectionHandler;
