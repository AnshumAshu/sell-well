const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.register = async (req, res) => {
  try {
    const { name, phone, email, password, role } = req.body;

    const userExists = await User.findOne({ phone });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      phone,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({
      message: 'User registered successfully',
      token: generateToken(user._id, user.role),
      user
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({
      message: 'Login successful',
      token: generateToken(user._id, user.role),
      user
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
