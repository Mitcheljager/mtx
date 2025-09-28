import { supabase } from "$lib/db";

export async function GET({ params }): Promise<Response> {
  const { id } = params;

  const { data, error } = await supabase
	    .from("categories")
	    .select("id, title, type")
	    .eq("id", id)
      .single();

  if (error) throw new Error(error.message);

  return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } });
}
