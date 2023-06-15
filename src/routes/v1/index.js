const express = require('express');

const UserController = require('../../controllers/user-controller');
const { AuthRequestValidator, IsAdminRequestValidator } = require('../../middlewares/index');

const router = express.Router();

router.post('/signup',AuthRequestValidator.validateUserAuth,UserController.create);
router.get('/user/:id',UserController.get);
router.post('/signin',AuthRequestValidator.validateUserAuth,UserController.signIn);
router.get('/isAuthenticated',UserController.isAuthenticated);
router.get('/isAdmin', IsAdminRequestValidator.validateIsAdminRequest,UserController.isAdmin);

module.exports = router;