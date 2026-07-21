import { supabase } from "$lib/db";
import { gamesSelect, gamesTable } from "$lib/stores/games";
import type { Game } from "$lib/types/Game";
import { sortedCategories } from "$lib/utils/categories";
import type { RequestEvent } from "./$types";

export async function GET({ url } : RequestEvent): Promise<Response> {
  const headers = { "cache-control": "max-age=3600", "Content-Type": "application/json" };

  const query = url.searchParams.get("query");

  const { data, error } = await supabase
    .from(gamesTable)
    .select(gamesSelect)
    .or(["title", "publisher"].map((field) => `${field}.ilike.%${query}%`).join(","))
    .limit(50);

  if (error) throw new Error(error.message);

  data.forEach((game) => (game.categories = sortedCategories(game.categories)));

  for (const game of data) delete game["id"];

  return new Response(JSON.stringify(data as Omit<Game, "id">[]), { headers });
}
