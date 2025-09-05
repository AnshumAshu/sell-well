const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  kabadiwala: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // optional
  scrapType: { type: String, required: true },
  weight: { type: Number, required: true },
  address: { type: String, required: true },
  location: {
    lat: Number,
    lng: Number
  },
  price: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'In Progress', 'Completed'],
    default: 'Pending'
  },
  paymentMethod: {
    type: String,
    enum: ['Cash', 'Credits', 'Voucher'],
    default: 'Cash'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
