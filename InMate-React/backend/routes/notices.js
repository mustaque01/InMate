const express = require('express');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Get notices
router.get('/', auth, async (req, res) => {
  try {
    res.json({ notices: [] });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
