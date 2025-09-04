const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['PENDING', 'CONFIRMED', 'ACTIVE', 'COMPLETED', 'CANCELLED'],
    default: 'PENDING'
  },
  monthlyRent: {
    type: Number,
    required: true,
    min: 0
  },
  securityDeposit: {
    type: Number,
    min: 0,
    default: 0
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for better query performance
bookingSchema.index({ userId: 1 });
bookingSchema.index({ roomId: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ startDate: 1 });

// Ensure a user can't have multiple active bookings
bookingSchema.index(
  { userId: 1, status: 1 },
  { 
    unique: true,
    partialFilterExpression: { 
      status: { $in: ['CONFIRMED', 'ACTIVE'] } 
    }
  }
);

module.exports = mongoose.model('Booking', bookingSchema);
