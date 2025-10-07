FROM node:22-alpine AS builder

WORKDIR /app

# Копируем package.json и lock
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходники
COPY . .

# Собираем (если нужно)
RUN npm run build

# Финальный образ
FROM node:22-alpine

WORKDIR /app

# Копируем зависимости из builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Копируем исходники (или только dist, если не нужен исходный код)
COPY . .

EXPOSE 3001

CMD ["node", "--import", "tsx", "src/main.ts"]