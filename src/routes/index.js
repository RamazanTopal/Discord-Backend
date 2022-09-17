const router = require('express').Router();
const userRoute = require('./user');
const friendInvitation = require('./friendInvitation');

router.use('/user', userRoute);
router.use('/friend-invitation', friendInvitation);
module.exports = router;
