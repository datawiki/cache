import { connect } from "https://deno.land/x/redis/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.0.0?bundle";

// Read environment variables
const redis = await connect({
  hostname: Deno.env.get("REDIS_HOST")!,
  port: parseInt(Deno.env.get("REDIS_PORT")!),
  password: Deno.env.get("REDIS_PASSWORD")!,
  tls: true // 👈 This enables TLS
});

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
