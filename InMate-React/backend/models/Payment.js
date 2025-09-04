const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  type: {
    type: String,
    enum: ['RENT', 'SECURITY_DEPOSIT', 'MAINTENANCE_FEE', 'LATE_FEE', 'OTHER'],
    default: 'RENT'
  },
  status: {
    type: String,
    enum: ['PENDING', 'PAID', 'OVERDUE', 'CANCELLED'],
    default: 'PENDING'
  },
  dueDate: {
    type: Date,
    required: true
  },
  paidDate: {
    type: Date
  },
  method: {
    type: String,
    enum: ['cash', 'card', 'upi', 'bank_transfer', 'cheque'],
    trim: true
  },
  reference: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for better query performance
paymentSchema.index({ userId: 1 });
paymentSchema.index({ bookingId: 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ dueDate: 1 });
paymentSchema.index({ type: 1 });

// Virtual to check if payment is overdue
paymentSchema.virtual('isOverdue').get(function() {
  return this.status === 'PENDING' && this.dueDate < new Date();
});

module.exports = mongoose.model('Payment', paymentSchema);
