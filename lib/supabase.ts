
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_KEY = Deno.env.get("SUPABASE_KEY")!;

export async function getMetadataFromSupabase(id: string) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/entity_metadata?id=eq.${id}`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  });
  const data = await res.json();
  return data[0];
}
