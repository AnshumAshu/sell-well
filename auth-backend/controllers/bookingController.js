const Booking = require('../models/Booking');

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      user: req.user._id,
      ...req.body
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all bookings for logged-in user
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id });
    res.json(bookings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Kabadiwala accepts a booking
const acceptBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.status = 'Accepted';
    booking.acceptedBy = req.user._id;
    await booking.save();

    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update booking status
const updateStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.status = req.body.status || booking.status;
    await booking.save();

    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  acceptBooking,
  updateStatus
};
