import { getEntityFromPostgres } from "../lib/postgres.ts";
import { getMetadataFromSupabase } from "../lib/supabase.ts";
import { getFromRedis, setInRedis } from "../lib/redis.ts";

export async function handleEntityRequest(req: Request): Promise<Response> {
  const id = req.url.split("/").pop();
  const cached = await getFromRedis(`entity:${id}`);
  if (cached) return new Response(cached, { status: 200 });

  const core = await getEntityFromPostgres(id);
  const meta = await getMetadataFromSupabase(id);
  const merged = { ...core, metadata: meta };

  await setInRedis(`entity:${id}`, JSON.stringify(merged));
  return new Response(JSON.stringify(merged), { status: 200 });
}

