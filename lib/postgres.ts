import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const client = new Client({
  hostname: Deno.env.get("PGHOST")!,
  user: Deno.env.get("PGUSER")!,
  password: Deno.env.get("PGPASSWORD")!,
  database: Deno.env.get("PGDATABASE")!,
  port: parseInt(Deno.env.get("PGPORT") || "5432"),
});

await client.connect();

export async function getEntityFromPostgres(id: string) {
  const result = await client.queryObject(
    "SELECT * FROM entities WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

