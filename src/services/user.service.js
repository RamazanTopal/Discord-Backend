const userModel = require('../models/user');
const { hashPassword, comparePassword } = require('../utils/hashAndComparePassword');

exports.register = async ({
  email, password, name, surname, gender,
}) => {
  try {
    await userModel.create({
      email, password, name, surname, gender,
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.login = async (email, password) => {
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error('User is not existed');
    }

    const isMatched = await comparePassword(password, user.password);

    if (!isMatched) {
      throw new Error('Password is wrong');
    }

    return user;
  } catch (error) {
    throw new Error(error);
  }
};

exports.updatePassword = async (oldPassword, newPassword, userId) => {
  try {
    const user = await userModel.findOne({ _id: userId });

    if (!user) {
      throw new Error('User is not existed');
    }

    const isMatched = await comparePassword(oldPassword, user.password);

    if (!isMatched) {
      throw new Error('Old password is wrong');
    }
    const hashedPassword = await hashPassword(newPassword);
    await userModel.findOneAndUpdate({ _id: userId }, { password: hashedPassword });
    return user;
  } catch (error) {
    throw new Error(error);
  }
};
