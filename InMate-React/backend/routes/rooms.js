const express = require('express');
const { auth, adminAuth } = require('../middleware/auth');
const Room = require('../models/Room');

const router = express.Router();

// Get all rooms
router.get('/', auth, async (req, res) => {
  try {
    const rooms = await Room.find().sort({ roomNumber: 1 });
    res.json({ rooms });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create room (Admin only)
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).json({ room });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
