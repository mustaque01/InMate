import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@hostel.com' },
    update: {},
    create: {
      email: 'admin@hostel.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      phone: '+1234567890',
      role: 'ADMIN',
    },
  })

  // Create student user
  const studentPassword = await bcrypt.hash('student123', 12)
  
  const student = await prisma.user.upsert({
    where: { email: 'john.doe@student.com' },
    update: {},
    create: {
      email: 'john.doe@student.com',
      password: studentPassword,
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567891',
      role: 'STUDENT',
    },
  })

  console.log('✅ Users created:')
  console.log('Admin:', admin.email)
  console.log('Student:', student.email)
}

main()
  .catch((e) => {
    console.error('Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
