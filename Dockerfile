
FROM denoland/deno:alpine
WORKDIR /app
COPY . .
CMD ["run", "--allow-net", "--allow-env", "main.ts"]
