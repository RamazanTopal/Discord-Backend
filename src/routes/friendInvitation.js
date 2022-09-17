const router = require('express').Router();
const authentication = require('../middlewares/authentication');
const invitationController = require('../controllers/friendsInvitation.controller');

router.route('/invite').post(authentication, invitationController.inviteFriend);
router.route('/accept').post(authentication, invitationController.acceptFriend);
router.route('/reject').post(authentication, invitationController.rejectFriend);
module.exports = router;
