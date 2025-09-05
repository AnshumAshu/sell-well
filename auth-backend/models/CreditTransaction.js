const mongoose = require('mongoose');

const creditTransactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['Earn', 'Redeem'], required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CreditTransaction', creditTransactionSchema);
