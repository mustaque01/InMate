const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['GENERAL', 'MAINTENANCE', 'PAYMENT_REMINDER', 'RULE_UPDATE', 'EVENT', 'EMERGENCY'],
    default: 'GENERAL'
  },
  priority: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
    default: 'MEDIUM'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdById: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  targetRole: {
    type: String,
    enum: ['ADMIN', 'STUDENT'],
    // null means all users
  }
}, {
  timestamps: true
});

// Index for better query performance
noticeSchema.index({ isActive: 1 });
noticeSchema.index({ type: 1 });
noticeSchema.index({ priority: 1 });
noticeSchema.index({ createdById: 1 });
noticeSchema.index({ targetRole: 1 });
noticeSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Notice', noticeSchema);
