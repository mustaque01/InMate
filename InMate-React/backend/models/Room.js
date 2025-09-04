const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['SINGLE', 'DOUBLE', 'TRIPLE', 'DORMITORY'],
    default: 'SINGLE'
  },
  capacity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  currentOccupancy: {
    type: Number,
    default: 0,
    min: 0
  },
  floor: {
    type: Number,
    required: true,
    min: 1
  },
  block: {
    type: String,
    required: true,
    trim: true
  },
  monthlyRent: {
    type: Number,
    required: true,
    min: 0
  },
  amenities: {
    type: [String],
    default: []
  },
  status: {
    type: String,
    enum: ['AVAILABLE', 'OCCUPIED', 'MAINTENANCE', 'RESERVED'],
    default: 'AVAILABLE'
  },
  description: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for better query performance
roomSchema.index({ roomNumber: 1 });
roomSchema.index({ status: 1 });
roomSchema.index({ type: 1 });
roomSchema.index({ block: 1 });

// Virtual to check if room is available
roomSchema.virtual('isAvailable').get(function() {
  return this.currentOccupancy < this.capacity && this.status === 'AVAILABLE';
});

module.exports = mongoose.model('Room', roomSchema);
