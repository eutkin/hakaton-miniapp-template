import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { initTelemetry } from './telemetry'

initTelemetry()

const app = new Hono()

app.use('*', logger())
app.use('*', cors())

app.get('/health', (c) => {
  return c.json({ status: 'ok', service: 'bff' })
})

app.post('/api/submit', async (c) => {
  try {
    const body = await c.req.json()
    
    console.log('Received form data:', body)

    const mockApiUrl = process.env.MOCK_API_URL || 'http://mock-api:3002'
    const response = await fetch(`${mockApiUrl}/api/process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`Mock API responded with status ${response.status}`)
    }

    const result = await response.json()
    
    console.log('Mock API response:', result)

    return c.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error processing request:', error)
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      500
    )
  }
})

const port = parseInt(process.env.PORT || '3001')
console.log(`BFF server is running on port ${port}`)

export default {
  port,
  fetch: app.fetch,
}
