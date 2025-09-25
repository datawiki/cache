import { connectTLS } from "https://deno.land/x/redis/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.0.0?bundle";

// Read environment variables
const redisHost = Deno.env.get("REDIS_HOST");
const redisPort = parseInt(Deno.env.get("REDIS_PORT") || "6380"); // TLS port
const redisPassword = Deno.env.get("REDIS_PASSWORD");
const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseKey = Deno.env.get("SUPABASE_KEY");

// Validate required variables
if (!redisHost || !redisPort || !redisPassword || !supabaseUrl || !supabaseKey) {
  throw new Error("Missing required environment variables");
}

// Connect to Redis (TLS)
const redis = await connectTLS({
  hostname: redisHost,
  port: redisPort,
  password: redisPassword
});

// Test Redis connection
const pong = await redis.ping();
console.log("Redis says:", pong); // Should log "PONG"

// Connect to Supabase
const supabase = createClient(supabaseUrl, supabaseKey);
