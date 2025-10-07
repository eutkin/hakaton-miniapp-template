// src/telemetry.ts
import {
    diag,
    DiagConsoleLogger,
    DiagLogLevel,
} from "@opentelemetry/api";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { Resource } from "@opentelemetry/resources";
import {
    SEMRESATTRS_SERVICE_NAME,
    SEMRESATTRS_DEPLOYMENT_ENVIRONMENT,
} from "@opentelemetry/semantic-conventions";

// Включить логирование OTel (опционально)
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

const sdk = new NodeSDK({
    resource: new Resource({
        [SEMRESATTRS_SERVICE_NAME]: "bff",
        [SEMRESATTRS_DEPLOYMENT_ENVIRONMENT]:
            Deno.env.get("ENVIRONMENT") || "development",
    }),
    traceExporter: new OTLPTraceExporter({
        url: Deno.env.get("OTEL_EXPORTER_OTLP_ENDPOINT") || "http://alloy:4317",
    }),
    instrumentations: [
        new HttpInstrumentation({
            // Автоматически трассировать HTTP-запросы
            applyCustomAttributesOnSpan: (span, request, response) => {
                span.setAttribute("http.host", request.headers.get("host") || "");
                if (response) {
                    span.setAttribute("http.status_code", response.status);
                }
            },
        }),
    ],
});

sdk.start();

// Graceful shutdown
addEventListener("beforeunload", () => {
    sdk.shutdown();
});

export default sdk;