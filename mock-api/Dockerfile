# Используем официальный образ Deno
FROM denoland/deno:2.5.3

WORKDIR /app

# Копируем конфиг и зависимости
COPY deno.json deno.json

RUN deno install

COPY src/ src/

# Предварительно кэшируем зависимости
RUN deno cache src/index.ts

# Запуск
CMD ["deno", "run", "--allow-net", "--allow-env", "--allow-read", "src/index.ts"]