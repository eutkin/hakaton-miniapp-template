import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { initTelemetry, getTracer, shutdownTelemetry } from './telemetry.ts'

initTelemetry()
const tracer = getTracer('bff-service')

const app = new Hono()

app.use('*', logger())
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

app.get('/health', (c) => {
  return c.json({ 
    status: 'ok', 
    service: 'bff',
    timestamp: new Date().toISOString()
  })
})

app.post('/api/submit', async (c) => {
  const span = tracer.startSpan('submit_form')
  
  try {
    const body = await c.req.json()
    span.addEvent('form_data_received', { data: JSON.stringify(body) })
    
    console.log('Received form data:', body)

    const mockApiUrl = Deno.env.get('MOCK_API_URL') || 'http://mock-api:3002'
    
    const apiSpan = tracer.startSpan('call_mock_api', { 
      parent: span.spanContext() 
    })
    
    try {
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
      apiSpan.addEvent('mock_api_response_received')
      apiSpan.end()
      
      console.log('Mock API response:', result)

      span.addEvent('success')
      span.end()

      return c.json({
        success: true,
        data: result,
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      apiSpan.recordException(error as Error)
      apiSpan.end()
      throw error
    }
  } catch (error) {
    console.error('Error processing request:', error)
    span.recordException(error as Error)
    span.end()
    
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      500
    )
  }
})

const port = parseInt(Deno.env.get('PORT') || '3001')

console.log('═══════════════════════════════════════════════════════')
console.log('  🚀 BFF Service (Deno + Hono)')
console.log('═══════════════════════════════════════════════════════')
console.log(`  Port: ${port}`)
console.log(`  Health: http://localhost:${port}/health`)
console.log('═══════════════════════════════════════════════════════')

Deno.serve({ port }, app.fetch)

Deno.addSignalListener('SIGTERM', () => {
  shutdownTelemetry()
  Deno.exit(0)
})
