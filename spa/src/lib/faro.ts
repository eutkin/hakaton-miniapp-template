import { initializeFaro, getWebInstrumentations } from '@grafana/faro-web-sdk'
import { TracingInstrumentation } from '@grafana/faro-web-tracing'

export function initFaro() {
  const faroUrl = import.meta.env.VITE_FARO_URL || '/faro/collect'
  
  const faro = initializeFaro({
    url: faroUrl,
    app: {
      name: 'spa-application',
      version: '1.0.0',
      environment: import.meta.env.MODE || 'development',
    },
    instrumentations: [
      ...getWebInstrumentations({
        captureConsole: true,
        captureConsoleDisabledLevels: [],
      }),
      new TracingInstrumentation(),
    ],
  })

  console.log('✓ Grafana Faro initialized')
  console.log(`✓ Sending to: ${faroUrl}`)
  
  return faro
}
