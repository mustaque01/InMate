// Test the login API directly
const fetch = require('node-fetch')

async function testLogin() {
  console.log('Testing login API...')
  
  const loginData = {
    email: 'admin@hostel.com',
    password: 'admin123',
    role: 'admin'
  }
  
  try {
    console.log('Sending request with data:', loginData)
    
    const response = await fetch('http://localhost:3005/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData)
    })
    
    console.log('Response status:', response.status)
    console.log('Response headers:', Object.fromEntries(response.headers.entries()))
    
    const data = await response.text()
    console.log('Response body:', data)
    
    try {
      const jsonData = JSON.parse(data)
      console.log('Parsed JSON:', jsonData)
    } catch (e) {
      console.log('Could not parse as JSON')
    }
    
  } catch (error) {
    console.error('Login test error:', error)
  }
}

testLogin()
