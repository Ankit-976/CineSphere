const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware')
const bookingController = require('../controllers/booking.controller')
const router = express.Router();

router.post('/',authMiddleware.authUserMiddleware, bookingController.createBooking);


module.exports = router