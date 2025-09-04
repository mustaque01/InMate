import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@hostel.com' },
    update: {},
    create: {
      email: 'admin@hostel.com',
      password: hashedPassword,
      name: 'System Administrator',
      role: 'ADMIN',
      phone: '+1234567890',
    }
  })

  console.log('Created admin user:', admin.email)

  // Create sample rooms
  const rooms = [
    // Block A - Single rooms
    { roomNumber: 'A-101', type: 'SINGLE' as const, capacity: 1, floor: 1, block: 'A', monthlyRent: 5000, amenities: '["Wi-Fi", "Attached Bathroom", "Study Table"]' },
    { roomNumber: 'A-102', type: 'SINGLE' as const, capacity: 1, floor: 1, block: 'A', monthlyRent: 5000, amenities: '["Wi-Fi", "Attached Bathroom", "Study Table"]' },
    { roomNumber: 'A-103', type: 'DOUBLE' as const, capacity: 2, floor: 1, block: 'A', monthlyRent: 4000, amenities: '["Wi-Fi", "Shared Bathroom", "Study Table"]' },
    { roomNumber: 'A-201', type: 'SINGLE' as const, capacity: 1, floor: 2, block: 'A', monthlyRent: 5500, amenities: '["Wi-Fi", "Attached Bathroom", "Study Table", "Balcony"]' },
    { roomNumber: 'A-202', type: 'DOUBLE' as const, capacity: 2, floor: 2, block: 'A', monthlyRent: 4500, amenities: '["Wi-Fi", "Shared Bathroom", "Study Table", "Balcony"]' },
    
    // Block B - Mix of room types
    { roomNumber: 'B-101', type: 'TRIPLE' as const, capacity: 3, floor: 1, block: 'B', monthlyRent: 3500, amenities: '["Wi-Fi", "Shared Bathroom", "Study Table"]' },
    { roomNumber: 'B-102', type: 'DOUBLE' as const, capacity: 2, floor: 1, block: 'B', monthlyRent: 4000, amenities: '["Wi-Fi", "Attached Bathroom", "Study Table"]' },
    { roomNumber: 'B-201', type: 'SINGLE' as const, capacity: 1, floor: 2, block: 'B', monthlyRent: 5200, amenities: '["Wi-Fi", "Attached Bathroom", "Study Table", "AC"]' },
    { roomNumber: 'B-202', type: 'TRIPLE' as const, capacity: 3, floor: 2, block: 'B', monthlyRent: 3800, amenities: '["Wi-Fi", "Shared Bathroom", "Study Table", "Balcony"]' },
    
    // Block C - Economy options
    { roomNumber: 'C-101', type: 'DORMITORY' as const, capacity: 6, floor: 1, block: 'C', monthlyRent: 2500, amenities: '["Wi-Fi", "Shared Bathroom", "Locker"]' },
    { roomNumber: 'C-102', type: 'TRIPLE' as const, capacity: 3, floor: 1, block: 'C', monthlyRent: 3200, amenities: '["Wi-Fi", "Shared Bathroom", "Study Table"]' },
    { roomNumber: 'C-201', type: 'DORMITORY' as const, capacity: 6, floor: 2, block: 'C', monthlyRent: 2800, amenities: '["Wi-Fi", "Shared Bathroom", "Locker", "Common Area"]' },
  ]

  for (const roomData of rooms) {
    await prisma.room.upsert({
      where: { roomNumber: roomData.roomNumber },
      update: {},
      create: roomData
    })
  }

  console.log(`Created ${rooms.length} sample rooms`)

  // Create sample student
  const studentPassword = await bcrypt.hash('student123', 12)
  
  const student = await prisma.user.upsert({
    where: { email: 'john.doe@student.com' },
    update: {},
    create: {
      email: 'john.doe@student.com',
      password: studentPassword,
      name: 'John Doe',
      role: 'STUDENT',
      phone: '+9876543210',
      studentId: 'STU001',
      course: 'Computer Science',
      year: 2,
      guardianName: 'Robert Doe',
      guardianPhone: '+9876543211',
      address: '123 Main St, City, State',
      emergencyContact: '+9876543211'
    }
  })

  console.log('Created sample student:', student.email)

  // Create sample notices
  const notices = [
    {
      title: 'Welcome to the Hostel!',
      content: 'Welcome to our hostel management system. Please familiarize yourself with the rules and regulations.',
      type: 'GENERAL' as const,
      priority: 'MEDIUM' as const,
      targetRole: null,
      createdById: admin.id
    },
    {
      title: 'Rent Payment Due',
      content: 'Monthly rent payments are due by the 5th of each month. Please ensure timely payment to avoid late fees.',
      type: 'PAYMENT_REMINDER' as const,
      priority: 'HIGH' as const,
      targetRole: 'STUDENT' as const,
      createdById: admin.id
    },
    {
      title: 'Maintenance Schedule',
      content: 'Building maintenance will be conducted on Saturday from 9 AM to 5 PM. There may be temporary water disruption.',
      type: 'MAINTENANCE' as const,
      priority: 'MEDIUM' as const,
      targetRole: null,
      createdById: admin.id
    }
  ]

  for (const noticeData of notices) {
    await prisma.notice.create({
      data: noticeData
    })
  }

  console.log(`Created ${notices.length} sample notices`)

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
