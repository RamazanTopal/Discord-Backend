/* eslint-disable no-underscore-dangle */
const Message = require('../models/message');
const Conversation = require('../models/conversation');
const { updateChatHistory } = require('./updates/chat');

const directMessageHandler = async (socket, data) => {
  try {
    const { _id } = socket.user._doc;
    const { receiverUserId, content } = data;
    const message = await Message.create({
      content,
      author: _id,
      date: new Date(),
      type: 'DIRECT',
    });

    const conversaiton = await Conversation.findOne({
      participants: { $all: [_id, receiverUserId] },
    });

    if (conversaiton) {
      conversaiton.messages.push(message._id);
      await conversaiton.save();
      updateChatHistory(conversaiton._id.toString());
    } else {
      const newConversation = await Conversation.create({
        messages: [message._id],
        participants: [_id, receiverUserId],
      });
      updateChatHistory(newConversation._id.toString());
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = directMessageHandler;
