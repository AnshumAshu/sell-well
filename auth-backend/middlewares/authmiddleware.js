const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to check if user is authenticated
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  return res.status(401).json({ message: 'Not authorized, no token' });
};

// Middleware to check if user role is "kabadiwala"
const isKabadiwala = (req, res, next) => {
  if (req.user && req.user.role === 'kabadiwala') {
    return next();
  } else {
    return res.status(403).json({ message: 'Not authorized as Kabadiwala' });
  }
};

module.exports = { protect, isKabadiwala };
