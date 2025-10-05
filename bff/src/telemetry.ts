import { NodeSDK } from '@opentelemetry/sdk-node'
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { Resource } from '@opentelemetry/resources'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'

const otlpExporter = new OTLPTraceExporter({
  url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://alloy:4318/v1/traces',
})

const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: process.env.OTEL_SERVICE_NAME || 'bff',
  }),
  traceExporter: otlpExporter,
  instrumentations: [getNodeAutoInstrumentations()],
})

export function initTelemetry() {
  sdk.start()
  console.log('OpenTelemetry initialized')

  process.on('SIGTERM', () => {
    sdk
      .shutdown()
      .then(() => console.log('OpenTelemetry terminated'))
      .catch((error) => console.log('Error terminating OpenTelemetry', error))
      .finally(() => process.exit(0))
  })
}
