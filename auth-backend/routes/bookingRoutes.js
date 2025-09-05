const express = require('express');
const { createBooking, getUserBookings, acceptBooking, updateStatus } = require('../controllers/bookingController');
const { protect, isKabadiwala } = require('../middlewares/authmiddleware');

const router = express.Router();

// User creates booking
router.post('/', protect, createBooking);

// User gets their bookings
router.get('/', protect, getUserBookings);

// Kabadiwala accepts booking
router.put('/:id/accept', protect, isKabadiwala, acceptBooking);

// Update booking status
router.put('/:id/status', protect, updateStatus);

module.exports = router;
