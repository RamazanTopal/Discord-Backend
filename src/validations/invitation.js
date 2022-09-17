const Joi = require('joi');

const postFriendInvitationSchema = Joi.object({
  targetEmailAddress: Joi.string().email(),
});

module.exports = postFriendInvitationSchema;
