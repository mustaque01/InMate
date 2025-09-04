const express = require('express');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Get bookings
router.get('/', auth, async (req, res) => {
  try {
    res.json({ bookings: [] });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
