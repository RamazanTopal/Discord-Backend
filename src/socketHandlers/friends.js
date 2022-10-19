const friendInvitationModel = require('../models/friendInvitation');
const userModel = require('../models/user');
const serverStore = require('../serverStore');

const updateFriendsPendingInvitations = async (userId) => {
  try {
    const pendingInvitations = await friendInvitationModel.find({ receiverId: userId }).populate('senderId', '_id name email');

    const receiverList = serverStore.getActiveConnections(userId);

    const io = serverStore.getSocketServerInstance();

    receiverList.forEach((receiverSocketId) => {
      io.to(receiverSocketId).emit('friends-invitations', {
        pendingInvitations: pendingInvitations || [],
      });
    });
  } catch (error) {
    throw new Error(error);
  }
};

const updateFriends = async (userId) => {
  try {
    const receiverList = serverStore.getActiveConnections(userId);

    if (receiverList.length > 0) {
      const user = await userModel.findById(userId, { _id: 1, friends: 1 }).populate('friends', '_id name email');
      if (user) {
        const friendsList = user.friends.map((f) => ({
          // eslint-disable-next-line no-underscore-dangle
          id: f._id,
          email: f.email,
          name: f.name,
        }));

        const io = serverStore.getSocketServerInstance();

        receiverList.forEach((receiverSocketId) => {
          io.to(receiverSocketId).emit('friends-list', {
            friends: friendsList || [],
          });
        });
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = {
  updateFriendsPendingInvitations,
  updateFriends,
};
