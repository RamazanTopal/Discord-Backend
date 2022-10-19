/* eslint-disable no-underscore-dangle */
const Conversation = require('../models/conversation');
const { updateChatHistory } = require('./updates/chat');

const directChatHistoryHandler = async (socket, data) => {
  try {
    const { _id } = socket.user._doc;
    const { receiverUserId } = data;
    const conversation = await Conversation.findOne({ participants: { $all: [_id, receiverUserId] }, type: 'DIRECT' });
    if (conversation) {
      updateChatHistory(conversation._id.toString(), socket.id);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = directChatHistoryHandler;
