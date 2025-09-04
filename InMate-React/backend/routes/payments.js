const express = require('express');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Get payments
router.get('/', auth, async (req, res) => {
  try {
    res.json({ payments: [] });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
