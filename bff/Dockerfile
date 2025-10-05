FROM denoland/deno:2.1.4

WORKDIR /app

COPY deno.json ./
RUN deno install

COPY . .

EXPOSE 3001

CMD ["deno", "task", "start"]
