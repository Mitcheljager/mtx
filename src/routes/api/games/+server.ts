import { supabase } from "$lib/db";
import { gamesSelect, gamesTable, itemsPerPage } from "$lib/stores/games";
import { sortedCategories } from "$lib/utils/categories";
import type { RequestEvent } from "./$types";

export async function GET({ url } : RequestEvent): Promise<Response> {
  const page = parseInt(url.searchParams.get("page") || "1");

  const startOfRange = (page - 1) * itemsPerPage;
  const endOfRange = startOfRange + (itemsPerPage - 1);

  const { data, error } = await supabase
    .from(gamesTable)
    .select(gamesSelect)
    .order("created_at", { ascending: false })
    .range(startOfRange, endOfRange);

  if (error) throw new Error(error.message);

  data.forEach((game) => (game.categories = sortedCategories(game.categories)));

  return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } });
}
