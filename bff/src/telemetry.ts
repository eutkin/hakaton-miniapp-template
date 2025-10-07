import {NodeSDK} from "@opentelemetry/sdk-node";
import {PeriodicExportingMetricReader} from "@opentelemetry/sdk-metrics";
import {OTLPMetricExporter} from "@opentelemetry/exporter-metrics-otlp-grpc";
import {OTLPTraceExporter} from "@opentelemetry/exporter-trace-otlp-grpc";
import {defaultResource} from "@opentelemetry/resources";
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';


const sdk = new NodeSDK({
    resource: defaultResource(),
    traceExporter: new OTLPTraceExporter({
        url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
    }),
    metricReaders: [new PeriodicExportingMetricReader({
        exporter: new OTLPMetricExporter({
           url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT
        })
    })],
    instrumentations: [ getNodeAutoInstrumentations()],
});

sdk.start();

// Graceful shutdown
process.on("SIGTERM", () => {
    sdk.shutdown().then(
        () => console.log("SDK shut down successfully"),
        (err) => console.error("Error shutting down SDK", err)
    );
});

export default sdk;