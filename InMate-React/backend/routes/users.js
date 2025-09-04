const express = require('express');
const bcrypt = require('bcryptjs');
const { auth, adminAuth } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// @route   GET /api/users
// @desc    Get all users (Admin only)
// @access  Private
router.get('/', auth, adminAuth, async (req, res) => {
  try {
    const { role, search } = req.query;
    
    let filter = {};
    if (role) filter.role = role;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { studentId: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(filter).select('-password').sort({ createdAt: -1 });
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Only admin or the user themselves can view profile
    if (req.user.role !== 'ADMIN' && req.user.id !== user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/users
// @desc    Create new user (Admin only)
// @access  Private
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const { email, name, role, phone, studentId, course, year, guardianName, guardianPhone, address, emergencyContact } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Generate default password (can be changed later)
    const defaultPassword = 'hostel123';
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    user = new User({
      email,
      password: hashedPassword,
      name,
      role: role || 'STUDENT',
      phone,
      studentId,
      course,
      year,
      guardianName,
      guardianPhone,
      address,
      emergencyContact
    });

    await user.save();
    res.status(201).json({ 
      user: user.toJSON(),
      message: 'User created successfully with default password: hostel123'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/users/:id
// @desc    Update user
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Only admin or the user themselves can update profile
    if (req.user.role !== 'ADMIN' && req.user.id !== user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const updates = req.body;
    // Don't allow updating password through this route
    delete updates.password;
    
    // Only admin can update role
    if (req.user.role !== 'ADMIN') {
      delete updates.role;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    res.json({ user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
