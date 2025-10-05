FROM denoland/deno:2.1.4 AS builder

WORKDIR /app

COPY package*.json ./

RUN deno install -g npm:npm@latest && \
    npm ci

COPY . .

RUN npm run build

FROM caddy:2-alpine

COPY --from=builder /app/dist /srv
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80
