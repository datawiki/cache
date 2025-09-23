import { serve } from "https://deno.land/std/http/server.ts";
import { handleEntityRequest } from "./routes/entity.ts";

serve(async (req) => {
  const url = new URL(req.url);
  if (url.pathname.startsWith("/entity/")) {
    return await handleEntityRequest(req);
  }
  return new Response("Eezy Entity Resolver API", { status: 200 });
});

