const userService = require('../services/user.service');

exports.register = async (req, res, next) => {
  try {
    const {
      email, password, name, surname, gender,
    } = req.body;
    await userService.register({
      email, password, name, surname, gender,
    });
    return res.json({ success: true });
  } catch (error) {
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await userService.login(email, password);
    return res.json({ success: true });
  } catch (error) {
    return next(error);
  }
};
