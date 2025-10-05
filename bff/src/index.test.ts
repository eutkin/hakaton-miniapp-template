import { assertEquals } from '@std/assert'

Deno.test('BFF health endpoint', async () => {
  const response = await fetch('http://localhost:3001/health')
  const data = await response.json()
  
  assertEquals(response.status, 200)
  assertEquals(data.status, 'ok')
  assertEquals(data.service, 'bff')
})

Deno.test('BFF submit endpoint validation', async () => {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    message: 'Test message'
  }
  
  const response = await fetch('http://localhost:3001/api/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(testData),
  })
  
  const data = await response.json()
  
  assertEquals(response.status, 200)
  assertEquals(data.success, true)
})
