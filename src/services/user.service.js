const userModel = require('../models/user');
const comparePassword = require('../utils/comparePassword');

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
