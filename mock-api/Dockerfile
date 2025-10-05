FROM denoland/deno:2.1.4

WORKDIR /app

COPY deno.json ./
RUN deno install

COPY . .

EXPOSE 3002

CMD ["deno", "task", "start"]
