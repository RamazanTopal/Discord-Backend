/* eslint-disable no-underscore-dangle */
const serverStore = require('../serverStore');
const { updateFriendsPendingInvitations, updateFriends } = require('./friends');

// eslint-disable-next-line no-unused-vars
const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;
  serverStore.addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails._doc._id,
  });

  updateFriendsPendingInvitations(userDetails._doc._id);
  updateFriends(userDetails._doc._id);
};

module.exports = newConnectionHandler;
