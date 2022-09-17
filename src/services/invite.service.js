/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
const ApiError = require('../errors/api.error');
const userModel = require('../models/user');
const friendInviteModel = require('../models/friendInvitation');
const { updateFriendsPendingInvitations, updateFriends } = require('../socketHandlers/friends');

exports.invite = async (userId, email, targetEmail) => {
  try {
    if (email.toLowerCase() === targetEmail.toLowerCase()) {
      throw new ApiError({ message: 'You cannot become friend with yourself', status: 409 });
    }

    const targetUser = await userModel.findOne({ email: targetEmail.toLowerCase() });

    if (!targetUser) {
      throw new ApiError({
        message: `Friend of ${targetEmail} has not been found.Please check email address`,
        status: 422,
      });
    }

    const invitationAlreadyReceived = await friendInviteModel
      .findOne({ senderId: userId, receiverId: targetUser._id });

    if (invitationAlreadyReceived) {
      throw new ApiError({
        message: 'Invitation has been already sent',
        status: 422,
      });
    }

    const userAlreadyFriends = await targetUser.friends.find((friendId) => friendId.toString() === userId.toString());

    if (userAlreadyFriends) {
      throw new ApiError({
        message: 'Friend already added.Please check friends list',
        status: 422,
      });
    }

    await friendInviteModel.create({ senderId: userId, receiverId: targetUser._id });
    updateFriendsPendingInvitations(targetUser._id.toString());
  } catch (error) {
    if (error.name === 'ApiError') {
      throw new ApiError(error);
    }
    throw new Error(error);
  }
};

exports.reject = async (inviteId, userId) => {
  try {
    const isInvitationsExists = await friendInviteModel.exists({ _id: inviteId });
    if (isInvitationsExists) {
      await friendInviteModel.findByIdAndDelete(inviteId);
    }

    updateFriendsPendingInvitations(userId.toString());
  } catch (error) {
    if (error.name === 'ApiError') {
      throw new ApiError(error);
    }
    throw new Error(error);
  }
};

exports.accept = async (inviteId) => {
  try {
    const invitation = await friendInviteModel.findById(inviteId);
    if (!invitation) {
      throw new ApiError({ message: 'Error occured.Please try again' });
    }
    const { receiverId, senderId } = invitation;

    await userModel.findByIdAndUpdate(receiverId, { $push: { friends: { _id: senderId } } });
    await userModel.findByIdAndUpdate(senderId, { $push: { friends: { _id: receiverId } } });

    await friendInviteModel.findByIdAndRemove(inviteId);
    updateFriendsPendingInvitations(receiverId.toString());
    updateFriends(senderId.toString());
    updateFriends(receiverId.toString());
  } catch (error) {
    if (error.name === 'ApiError') {
      throw new ApiError(error);
    }
    throw new Error(error);
  }
};
