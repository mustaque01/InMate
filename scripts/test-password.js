const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('Testing password verification...')
  
  try {
    // Get admin user
    const admin = await prisma.user.findFirst({
      where: { email: 'admin@hostel.com' }
    })
    
    if (!admin) {
      console.log('Admin user not found!')
      return
    }
    
    console.log('Admin found:', admin.email, admin.role)
    console.log('Stored password hash:', admin.password.substring(0, 20) + '...')
    
    // Test password verification
    const testPassword = 'admin123'
    const isValid = await bcrypt.compare(testPassword, admin.password)
    
    console.log(`Password "${testPassword}" is valid:`, isValid)
    
    // Test with wrong password
    const wrongPassword = 'wrongpass'
    const isWrong = await bcrypt.compare(wrongPassword, admin.password)
    console.log(`Password "${wrongPassword}" is valid:`, isWrong)
    
  } catch (error) {
    console.error('Password test error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
