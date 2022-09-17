const { Schema, model } = require('mongoose');

const generalUserRef = {
  type: Schema.Types.ObjectId,
  ref: 'User',
};

const friendInvitationSchema = new Schema({
  senderId: generalUserRef,
  receiverId: generalUserRef,
});

module.exports = model('FriendInvitation', friendInvitationSchema);
