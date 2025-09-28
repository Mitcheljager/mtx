import { supabase } from "$lib/db";
import { sortedCategories } from "$lib/utils/categories";

export async function GET(): Promise<Response> {
  const { data, error } = await supabase
	    .from("categories")
	    .select("id, title, type")
	    .order("type");

  if (error) throw new Error(error.message);

  const categories = sortedCategories(data);

  return new Response(JSON.stringify(categories), { headers: { "Content-Type": "application/json" } });
}
