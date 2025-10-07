# Stage 1: Сборка
FROM node:24.9.0 AS builder

WORKDIR /app

# Установка зависимостей
COPY package*.json ./

# 🔥 Устанавливаем Rollup и его ARM64-бинарник ВРУЧНУЮ
RUN npm install --save-prod @rollup/rollup-linux-arm64-gnu
RUN npm ci

# Копирование исходного кода
COPY . .

# Сборка
RUN npm run build

FROM caddy:2-alpine

COPY --from=builder /app/dist /srv
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80
