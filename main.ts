// main.ts

import { connect } from "https://deno.land/x/redis@v0.40.0/mod.ts";

// Read environment variables
const redisHost = Deno.env.get("REDIS_HOST"); // e.g. "redis.upstash.io"
const redisPort = parseInt(Deno.env.get("REDIS_PORT") || "6380");
const redisPassword = Deno.env.get("REDIS_PASSWORD");

if (!redisHost || !redisPassword) {
  throw new Error("Missing Redis credentials");
}

// ✅ Connect to Redis with TLS
const redis = await connect({
  hostname: redisHost,
  port: redisPort,
  password: redisPassword,
  tls: true
});

// Test connection
const pong = await redis.ping();
console.log("Redis says:", pong); // Should log "PONG"

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
