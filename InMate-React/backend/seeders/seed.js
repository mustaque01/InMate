const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/User');
const Room = require('../models/Room');
const connectDB = require('../config/database');

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();
    
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Room.deleteMany({});
    
    console.log('🗑️ Cleared existing data');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      email: 'admin@hostel.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
      phone: '+1234567890'
    });
    
    console.log('👤 Created admin user');

    // Create student user
    const studentPassword = await bcrypt.hash('student123', 10);
    const student = await User.create({
      email: 'john.doe@student.com',
      password: studentPassword,
      name: 'John Doe',
      role: 'STUDENT',
      phone: '+1234567891',
      studentId: 'STU001',
      course: 'Computer Science',
      year: 2
    });
    
    console.log('👨‍🎓 Created student user');

    // Create sample rooms
    const rooms = [
      {
        roomNumber: 'A-101',
        type: 'SINGLE',
        capacity: 1,
        floor: 1,
        block: 'A',
        monthlyRent: 8500,
        amenities: ['AC', 'WiFi', 'Study Table'],
        status: 'AVAILABLE'
      },
      {
        roomNumber: 'A-102',
        type: 'DOUBLE',
        capacity: 2,
        floor: 1,
        block: 'A',
        monthlyRent: 6500,
        amenities: ['WiFi', 'Study Table', 'Wardrobe'],
        status: 'AVAILABLE'
      },
      {
        roomNumber: 'B-201',
        type: 'SINGLE',
        capacity: 1,
        floor: 2,
        block: 'B',
        monthlyRent: 9000,
        amenities: ['AC', 'WiFi', 'Study Table', 'Balcony'],
        status: 'OCCUPIED',
        currentOccupancy: 1
      },
      {
        roomNumber: 'B-202',
        type: 'TRIPLE',
        capacity: 3,
        floor: 2,
        block: 'B',
        monthlyRent: 5500,
        amenities: ['WiFi', 'Study Table'],
        status: 'AVAILABLE'
      },
      {
        roomNumber: 'C-301',
        type: 'DOUBLE',
        capacity: 2,
        floor: 3,
        block: 'C',
        monthlyRent: 7000,
        amenities: ['AC', 'WiFi', 'Study Table'],
        status: 'MAINTENANCE'
      }
    ];

    await Room.insertMany(rooms);
    console.log('🏠 Created sample rooms');

    console.log('✅ Database seeding completed successfully!');
    console.log('\n📝 Default login credentials:');
    console.log('Admin: admin@hostel.com / admin123');
    console.log('Student: john.doe@student.com / student123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
