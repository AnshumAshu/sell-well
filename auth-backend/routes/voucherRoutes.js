const express = require('express');
const { protect } = require('../middlewares/authmiddleware');
const { createVoucher, getVouchers, redeemVoucher } = require('../controllers/voucherController');

const router = express.Router();

router.post('/', protect, createVoucher);    // Admin creates voucher
router.get('/', protect, getVouchers);       // List all active vouchers
router.post('/redeem', protect, redeemVoucher);

module.exports = router;
