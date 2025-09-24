import { connect } from "redis";
import { createClient } from "supabase";
import { config } from "dotenv";

config(); // Optional for local dev

const redisHost = Deno.env.get("REDIS_HOST");
const redisPort = parseInt(Deno.env.get("REDIS_PORT") || "6379");
const redisPassword = Deno.env.get("REDIS_PASSWORD");

const redis = await connect({
  hostname: redisHost,
  port: redisPort,
  password: redisPassword
});

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseKey);
