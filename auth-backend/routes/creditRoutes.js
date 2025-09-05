// const express = require('express');
// const { protect } = require('../middlewares/authMiddleware');
// const { addCredits, getCredits } = require('../controllers/creditController');

// const router = express.Router();

// router.post('/add', protect, addCredits); // Admin/system triggers this
// router.get('/', protect, getCredits);     // Get user's credits

// module.exports = router;

const express = require('express');
const { protect } = require('../middlewares/authmiddleware');
const { addCredits, getCredits } = require('../controllers/creditController');

const router = express.Router();

router.post('/add', protect, addCredits); // Admin/system triggers this
router.get('/', protect, getCredits);     // Get user's credits

module.exports = router;