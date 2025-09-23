import { connect } from "https://deno.land/x/redis/mod.ts";

const redis = await connect({
  hostname: Deno.env.get("REDIS_HOST")!,
  port: parseInt(Deno.env.get("REDIS_PORT")!),
  password: Deno.env.get("REDIS_PASSWORD"),
});

export async function getFromRedis(key: string) {
  return await redis.get(key);
}

export async function setInRedis(key: string, value: string) {
  await redis.set(key, value);
}

