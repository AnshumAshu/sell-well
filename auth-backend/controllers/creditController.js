const CreditTransaction = require('../models/CreditTransaction');
const User = require('../models/User');

// Add credits (Admin only)
exports.addCredits = async (req, res) => {
  try {
    const { userId, amount, description } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await CreditTransaction.create({
      user: userId,
      type: 'Earn',
      amount,
      description
    });

    user.credits += amount;
    await user.save();

    res.status(201).json({ message: 'Credits added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user's credit balance & history
exports.getCredits = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const transactions = await CreditTransaction.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.json({ balance: user.credits, transactions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
