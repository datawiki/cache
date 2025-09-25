// main.ts

import { connect } from "https://deno.land/x/redis/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.0.0?bundle";

// Load environment variables
const redisHost = Deno.env.get("REDIS_HOST");
const redisPort = parseInt(Deno.env.get("REDIS_PORT") || "6380"); // TLS port
const redisPassword = Deno.env.get("REDIS_PASSWORD");
const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseKey = Deno.env.get("SUPABASE_KEY");

// Validate required variables
if (!redisHost || !redisPort || !redisPassword || !supabaseUrl || !supabaseKey) {
  throw new Error("Missing required environment variables");
}

// Connect to Redis with TLS
const redis = await connect({
  hostname: redisHost,
  port: redisPort,
  password: redisPassword,
  tls: true
});

// Test Redis connection
try {
  const pong = await redis.ping();
  console.log("✅ Redis connected:", pong); // Should log "PONG"
} catch (err) {
  console.error("❌ Redis connection failed:", err);
}

// Connect to Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

// Example Supabase insert (replace with your logic)
const { data, error } = await supabase
  .from("onboarding_page_content")
  .insert([
    {
      title: "Ready to Sell?",
      body: "EezyDoc is too wonderful for words.",
      role: 1, // FK to roles table
      page_name: "seller_landing",
      sub_title: "More sell – less redtape",
      image_url: "https://yourcdn.com/images/seller-landing.png",
      cta_text: "Begin Seller Setup",
      cta_action: "start_seller_flow",
      sections: [], // or your structured jsonb[]
      layout: {
        type: "grid",
        columns: 2
      }
    }
  ]);

if (error) {
  console.error("❌ Supabase insert failed:", error);
} else {
  console.log("✅ Supabase insert success:", data);
}
