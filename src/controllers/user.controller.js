const generateAccessToken = require('../utils/generateAccessToken');
const userService = require('../services/user.service');

exports.register = async (req, res, next) => {
  try {
    const {
      email, password, name, surname, gender,
    } = req.body;
    const userInformation = await userService.register({
      email, password, name, surname, gender,
    });
    return res.json({ success: true, userInformation });
  } catch (error) {
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userService.login(email, password);

    const userInformation = {
      ...user.toObject(),
      tokens: {
        access_token: generateAccessToken(user),
      },
    };

    return res.status(200).json({ success: true, userInformation });
  } catch (error) {
    return next(error);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const {
      oldPassword, newPassword,
    } = req.body;

    // eslint-disable-next-line no-underscore-dangle
    await userService.updatePassword(oldPassword, newPassword, req.user._id);
    return res.json({ success: true });
  } catch (error) {
    return next(error);
  }
};
