const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

//User routes

router.post('/user/register', authController.registerUser);
router.post('/user/login', authController.loginUser);
router.post('/user/logout', authController.logoutUser);
router.get('/user/me',authMiddleware.authUserMiddleware, authController.getCurrentUser);

module.exports = router;