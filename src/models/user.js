const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const generalStringType = {
  type: String,
  required: true,
};
const userSchema = new Schema({
  name: generalStringType,
  surname: generalStringType,
  password: generalStringType,
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) this.password = await bcrypt.hash(this.password, 12);

  next();
});

const User = model('User', userSchema);
module.exports = User;
