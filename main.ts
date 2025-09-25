import { connect } from "redis";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.0.0";

// Read environment variables injected by Railway
const redisHost = Deno.env.get("REDIS_HOST");
const redisPort = parseInt(Deno.env.get("REDIS_PORT") || "6379");
const redisPassword = Deno.env.get("REDIS_PASSWORD");

const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseKey = Deno.env.get("SUPABASE_KEY");

// Validate required variables
if (!redisHost || !redisPort || !redisPassword || !supabaseUrl || !supabaseKey) {
  throw new Error("Missing required environment variables");
}

// Connect to Redis
const redis = await connect({
  hostname: redisHost,
  port: redisPort,
  password: redisPassword
});

// Connect to Supabase
const supabase = createClient(supabaseUrl, supabaseKey);
