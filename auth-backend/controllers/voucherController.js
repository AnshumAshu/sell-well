const Voucher = require('../models/Voucher');
const User = require('../models/User');
const CreditTransaction = require('../models/CreditTransaction');

// Create a voucher (Admin use)
exports.createVoucher = async (req, res) => {
  try {
    const { code, value, minCredits } = req.body;
    const voucher = await Voucher.create({ code, value, minCredits });
    res.status(201).json(voucher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all active vouchers
exports.getVouchers = async (req, res) => {
  try {
    const vouchers = await Voucher.find({ isActive: true });
    res.json(vouchers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Redeem a voucher
exports.redeemVoucher = async (req, res) => {
  try {
    const { code } = req.body;
    const voucher = await Voucher.findOne({ code, isActive: true });
    const user = await User.findById(req.user.id);

    if (!voucher) return res.status(404).json({ message: 'Voucher not found' });
    if (user.credits < voucher.minCredits) {
      return res.status(400).json({ message: 'Not enough credits to redeem this voucher' });
    }

    user.credits -= voucher.minCredits;
    await user.save();

    await CreditTransaction.create({
      user: req.user.id,
      type: 'Redeem',
      amount: voucher.minCredits,
      description: `Redeemed voucher ${voucher.code}`
    });

    res.json({ message: 'Voucher redeemed successfully', voucher });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
