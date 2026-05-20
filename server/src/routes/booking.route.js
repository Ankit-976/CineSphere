const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware')
const bookingController = require('../controllers/booking.controller')
const router = express.Router();

router.post('/',authMiddleware.authUserMiddleware, bookingController.createBooking);
router.get('/getBookings', authMiddleware.authUserMiddleware, bookingController.getBookings);
router.get('/getTicket/:id', authMiddleware.authUserMiddleware, bookingController.getBookedTicket);


module.exports = router