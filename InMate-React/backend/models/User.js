const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['ADMIN', 'STUDENT'],
    default: 'STUDENT'
  },
  phone: {
    type: String,
    trim: true
  },
  
  // Student-specific fields
  studentId: {
    type: String,
    unique: true,
    sparse: true
  },
  roomNumber: {
    type: String,
    trim: true
  },
  course: {
    type: String,
    trim: true
  },
  year: {
    type: Number,
    min: 1,
    max: 5
  },
  guardianName: {
    type: String,
    trim: true
  },
  guardianPhone: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  emergencyContact: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;
      return ret;
    }
  }
});

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ studentId: 1 });
userSchema.index({ role: 1 });

module.exports = mongoose.model('User', userSchema);
