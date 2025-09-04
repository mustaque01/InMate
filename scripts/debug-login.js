const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function debugLogin() {
  console.log('=== DEBUG LOGIN PROCESS ===\n')
  
  try {
    // Test 1: Check database connection
    console.log('1. Testing database connection...')
    const userCount = await prisma.user.count()
    console.log(`   ✅ Database connected. Users: ${userCount}\n`)
    
    // Test 2: Find admin user
    console.log('2. Finding admin user...')
    const admin = await prisma.user.findFirst({
      where: {
        email: 'admin@hostel.com',
        role: 'ADMIN'
      }
    })
    
    if (!admin) {
      console.log('   ❌ Admin user not found!')
      console.log('   Available users:')
      const allUsers = await prisma.user.findMany({ 
        select: { email: true, role: true } 
      })
      console.table(allUsers)
      return
    }
    
    console.log(`   ✅ Admin user found: ${admin.email} (${admin.role})\n`)
    
    // Test 3: Password verification
    console.log('3. Testing password verification...')
    const testPassword = 'admin123'
    const isValidPassword = await bcrypt.compare(testPassword, admin.password)
    console.log(`   Password "${testPassword}" is valid: ${isValidPassword ? '✅' : '❌'}\n`)
    
    if (!isValidPassword) {
      console.log('   ❌ Password verification failed!')
      return
    }
    
    // Test 4: Test JWT functions
    console.log('4. Testing JWT functions...')
    try {
      const jwt = require('jsonwebtoken')
      const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret'
      
      const token = jwt.sign({
        userId: admin.id,
        email: admin.email,
        role: admin.role
      }, JWT_SECRET, { expiresIn: '7d' })
      
      console.log(`   ✅ JWT token generated: ${token.substring(0, 20)}...\n`)
      
      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET)
      console.log(`   ✅ JWT token verified:`, decoded)
      
    } catch (jwtError) {
      console.log(`   ❌ JWT error:`, jwtError.message)
    }
    
    console.log('\n=== LOGIN SHOULD WORK ===')
    console.log('Try logging in with:')
    console.log('Email: admin@hostel.com')
    console.log('Password: admin123')
    console.log('Role: admin')
    
  } catch (error) {
    console.error('❌ Debug error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

debugLogin()
