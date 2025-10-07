// src/main.ts
// 🔥 Импортируем telemetry первым
import "./telemetry.ts";

import { Hono } from "hono";
import { cors } from "hono/cors";
import {serve} from "@hono/node-server"

const app = new Hono();


// CORS
app.use("*", cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
}));

// Health check
app.get("/health", (c) => {
    return c.json({
        status: "ok",
        service: "bff-node",
        timestamp: new Date().toISOString(),
    });
});

// Пример API-эндпоинта
app.post("/api/submit", async (c) => {
    const body = await c.req.json();
    console.log("Received form data:", body);

    const mockApiUrl = process.env.MOCK_API_URL;

    const response = await fetch(`${mockApiUrl}/api/process`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        return c.json({ error: `Upstream error: ${response.status}` }, 502);
    }

    const result = await response.json();

    console.log("Mock API response:", result);

    return c.json({
        success: true,
        data: result,
        timestamp: new Date().toISOString(),
    });
});

const port = parseInt(process.env.PORT || "3001");

console.log(`🚀 BFF Service (Node.js) listening on port ${port}`);

serve ({ fetch: app.fetch, port });