const express = require('express');
const { auth, adminAuth } = require('../middleware/auth');
const User = require('../models/User');
const Room = require('../models/Room');
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');
const Notice = require('../models/Notice');

const router = express.Router();

// @route   GET /api/dashboard/admin
// @desc    Get admin dashboard data
// @access  Private (Admin only)
router.get('/admin', auth, adminAuth, async (req, res) => {
  try {
    const [
      totalRooms,
      occupiedRooms,
      totalStudents,
      pendingBookings,
      overduePayments,
      totalRevenue,
      recentBookings,
      recentPayments
    ] = await Promise.all([
      Room.countDocuments(),
      Room.countDocuments({ status: 'OCCUPIED' }),
      User.countDocuments({ role: 'STUDENT' }),
      Booking.countDocuments({ status: 'PENDING' }),
      Payment.countDocuments({ status: 'OVERDUE' }),
      Payment.aggregate([
        { $match: { status: 'PAID' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]),
      Booking.find({ status: { $in: ['PENDING', 'CONFIRMED'] } })
        .populate('userId', 'name email')
        .populate('roomId', 'roomNumber')
        .sort({ createdAt: -1 })
        .limit(5),
      Payment.find({ status: 'PAID' })
        .populate('userId', 'name email')
        .sort({ paidDate: -1 })
        .limit(5)
    ]);

    res.json({
      stats: {
        totalRooms,
        occupiedRooms,
        totalStudents,
        pendingBookings,
        overduePayments,
        totalRevenue: totalRevenue[0]?.total || 0,
        availableRooms: totalRooms - occupiedRooms
      },
      recentBookings,
      recentPayments
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/dashboard/student
// @desc    Get student dashboard data
// @access  Private (Student only)
router.get('/student', auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const [
      currentBooking,
      pendingPayments,
      recentNotices,
      roomDetails
    ] = await Promise.all([
      Booking.findOne({
        userId,
        status: { $in: ['CONFIRMED', 'ACTIVE'] }
      }).populate('roomId'),
      Payment.find({
        userId,
        status: { $in: ['PENDING', 'OVERDUE'] }
      }).sort({ dueDate: 1 }),
      Notice.find({
        $or: [
          { targetRole: 'STUDENT' },
          { targetRole: null }
        ],
        isActive: true
      }).sort({ createdAt: -1 }).limit(5),
      null // Will be populated if currentBooking exists
    ]);

    // Get room details if user has a current booking
    let room = null;
    if (currentBooking && currentBooking.roomId) {
      room = currentBooking.roomId;
    }

    res.json({
      currentBooking,
      pendingPayments,
      recentNotices,
      roomDetails: room
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
