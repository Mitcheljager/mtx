import { supabase } from "$lib/db";
import { gamesSelect } from "$lib/stores/games";

export async function GET({ params }): Promise<Response> {
  const { id } = params;

  const { data, error } = await supabase
    .from("game_category")
    .select(`game:games (${gamesSelect})`)
    .eq("category_id", id);

  if (error) throw new Error(error.message);

  const games = data.map(g => g.game);

  return new Response(JSON.stringify(games), { headers: { "Content-Type": "application/json" } });
}
