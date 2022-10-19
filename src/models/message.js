const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  content: {
    type: String,
  },
  date: {
    type: Date,
  },
  type: {
    type: String,
  },
});

module.exports = model('Message', messageSchema);
