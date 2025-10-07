import app from "./app.ts";

app.get('/health', (c) => {
    return c.json({
        status: 'ok',
        service: 'mock-api',
        timestamp: new Date().toISOString()
    })
})

app.post('/api/process', async (c) => {
    try {
        const body = await c.req.json()

        // Логируем
        console.log('=== Request Headers ===')
        for (const [key, value] of Object.entries(c.req.header())) {
            console.log(`${key}: ${value}`)
        }
        console.log('======================')

        console.log('Mock API received data:', body)

        await new Promise(resolve => setTimeout(resolve, 500))

        const response = {
            id: crypto.randomUUID(),
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

const port = parseInt(Deno.env.get('PORT') || '3002')

console.log('═══════════════════════════════════════════════════════')
console.log('  🎭 Mock API Service (Deno + Hono)')
console.log('═══════════════════════════════════════════════════════')
console.log(`  Port: ${port}`)
console.log(`  Health: http://localhost:${port}/health`)
console.log('═══════════════════════════════════════════════════════')

Deno.serve({port}, app.fetch)
