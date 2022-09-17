const validateEmail = require('../validations/invitation');
const ApiError = require('../errors/api.error');
const inviteService = require('../services/invite.service');

exports.inviteFriend = async (req, res, next) => {
  try {
    const {
      targetEmailAddress,
    } = req.body;
    const { _id, email } = req.user;

    const matchValidation = validateEmail.validate({ targetEmailAddress });

    if (matchValidation.error) {
      throw new ApiError({ message: 'Email validation is wrong', status: 422 });
    }

    await inviteService.invite(_id, email, targetEmailAddress);
    return res.json({ success: true });
  } catch (error) {
    return next(error);
  }
};

exports.rejectFriend = async (req, res, next) => {
  try {
    const { id } = req.body;
    const { _id } = req.user;

    await inviteService.reject(id, _id);

    return res.json({ success: true });
  } catch (error) {
    return next(error);
  }
};

exports.acceptFriend = async (req, res, next) => {
  try {
    const { id } = req.body;

    await inviteService.accept(id);

    return res.json({ success: true });
  } catch (error) {
    return next(error);
  }
};
