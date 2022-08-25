const router = require('express').Router();
const userController = require('../controllers/user.controller');
const authentication = require('../middlewares/authentication');

router.route('/register').post(userController.register);
router.route('/login').post(userController.login);
router.route('/updatePassword').put(authentication, userController.updatePassword);
module.exports = router;
