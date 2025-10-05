import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node'
import { Resource } from '@opentelemetry/resources'
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions'
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { trace } from '@opentelemetry/api'

let provider: NodeTracerProvider | null = null

export function initTelemetry() {
  const serviceName = Deno.env.get('OTEL_SERVICE_NAME') || 'bff'
  const otlpEndpoint = Deno.env.get('OTEL_EXPORTER_OTLP_ENDPOINT') || 'http://alloy:4318/v1/traces'

  const resource = new Resource({
    [ATTR_SERVICE_NAME]: serviceName,
  })

  provider = new NodeTracerProvider({
    resource,
  })

  const exporter = new OTLPTraceExporter({
    url: otlpEndpoint,
  })

  provider.addSpanProcessor(new BatchSpanProcessor(exporter))
  provider.register()

  console.log(`✓ OpenTelemetry initialized for service: ${serviceName}`)
  console.log(`✓ Exporting traces to: ${otlpEndpoint}`)
}

export function getTracer(name: string) {
  return trace.getTracer(name)
}

export function shutdownTelemetry() {
  if (provider) {
    provider.shutdown()
    console.log('✓ OpenTelemetry shutdown')
  }
}
