import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

const app = new Hono()

app.use('*', logger())
app.use('*', cors())

app.get('/health', (c) => {
  return c.json({ status: 'ok', service: 'mock-api' })
})

app.post('/api/process', async (c) => {
  try {
    const body = await c.req.json()
    
    console.log('Mock API received data:', body)

    await new Promise(resolve => setTimeout(resolve, 500))

    const response = {
      id: Math.random().toString(36).substr(2, 9),
      status: 'processed',
      receivedData: body,
      processedAt: new Date().toISOString(),
      message: 'Data successfully processed by Mock API',
      metadata: {
        processingTime: '500ms',
        version: '1.0.0',
      },
    }

    console.log('Mock API sending response:', response)

    return c.json(response)
  } catch (error) {
    console.error('Mock API error:', error)
    return c.json(
      {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      500
    )
  }
})

const port = parseInt(process.env.PORT || '3002')
console.log(`Mock API server is running on port ${port}`)

export default {
  port,
  fetch: app.fetch,
}
