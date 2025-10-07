import { Hono } from "hono";
import { cors } from "hono/cors"
import { logger } from "hono/logger"

import { otel } from '@hono/otel'
import {
    diag,
    DiagConsoleLogger,
    DiagLogLevel,
} from "@opentelemetry/api";
import {NodeSDK} from "@opentelemetry/sdk-node";
import {OTLPTraceExporter} from "npm:@opentelemetry/exporter-trace-otlp-http";
import {Resource} from "@opentelemetry/resources";
import {
    SEMRESATTRS_SERVICE_NAME,
    SEMRESATTRS_DEPLOYMENT_ENVIRONMENT,
} from "@opentelemetry/semantic-conventions";
import { AlwaysOnSampler } from "npm:@opentelemetry/sdk-trace-base";

// Включить логирование OTel (опционально)
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const sdk = new NodeSDK({
    resource: new Resource({
        [SEMRESATTRS_SERVICE_NAME]: Deno.env.get("OTEL_SERVICE_NAME") || "mock-api",
        [SEMRESATTRS_DEPLOYMENT_ENVIRONMENT]:
            Deno.env.get("ENVIRONMENT") || "development",
    }),
    traceExporter: new OTLPTraceExporter({
        url: Deno.env.get("OTEL_EXPORTER_OTLP_ENDPOINT") + "/v1/traces",
    }),
    sampler: new AlwaysOnSampler()
});

sdk.start()

// Graceful shutdown
addEventListener("beforeunload", () => {
    sdk.shutdown();
});

const app = new Hono()

app.use('*', otel())

// Добавим CORS
app.use("*", cors({
    origin: "*", // или ограничь как нужно
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
}));

app.use("*", logger())

export default app