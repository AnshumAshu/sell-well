const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true },
  value: { type: Number, required: true },
  minCredits: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Voucher', voucherSchema);
