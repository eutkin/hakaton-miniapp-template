import { Hono } from "hono";
import { cors } from "hono/cors"

const app = new Hono();

// Добавим CORS
app.use("*", cors({
    origin: "*", // или ограничь как нужно
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
}));

export default app