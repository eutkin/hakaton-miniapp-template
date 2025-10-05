import { assertEquals } from '@std/assert'

Deno.test('Mock API health endpoint', async () => {
  const response = await fetch('http://localhost:3002/health')
  const data = await response.json()
  
  assertEquals(response.status, 200)
  assertEquals(data.status, 'ok')
  assertEquals(data.service, 'mock-api')
})

Deno.test('Mock API process endpoint', async () => {
  const testData = {
    name: 'Test',
    email: 'test@example.com',
    message: 'Test message'
  }
  
  const response = await fetch('http://localhost:3002/api/process', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(testData),
  })
  
  const data = await response.json()
  
  assertEquals(response.status, 200)
  assertEquals(data.status, 'processed')
  assertEquals(data.receivedData.name, 'Test')
})
