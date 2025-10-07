// src/main.ts
// 🔥 Импортируем telemetry первым
import "./telemetry.ts";

import {Hono} from "hono";
import {cors} from "hono/cors";
import {serve} from "@hono/node-server"
import {parse, validate} from '@tma.js/init-data-node';

const app = new Hono();


// CORS
app.use("*", cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
}));

const botToken = process.env.BOT_TOKEN

app.use("*", async (c, next) => {
    const initData = c.req.header('X-Init-Data');
    if (initData && botToken) {
        try {
            validate(initData, botToken)

            const initDataParsed = parse(initData);

            const userId = initDataParsed.user?.id

            if (!userId) {
                return c.json({ error: "Unauthorized: User ID not found" }, 403);
            }

            const newHeaders = new Headers(c.req.raw.headers);
            newHeaders.delete("X-Init-Data");
            newHeaders.set("X-Telegram-User-ID", userId.toString());

            // Создаём новый Request с новыми заголовками
            c.req.raw = new Request(c.req.raw, {
                headers: newHeaders,
            })
        } catch (e ) {
            return c.json({error: "Unauthorized: No init data" }, 401);
        }
    }
    await next()
})

app.use("*", async (c, next) => {
    console.log(c.req.header('X-Telegram-User-Id'))
    await next()
})

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