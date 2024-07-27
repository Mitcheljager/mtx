import { supabase } from "$lib/db"
import { gamesTable } from "$lib/stores/games"
import type { RequestEvent } from "./$types"

export async function GET({} : RequestEvent) {
  const headers = { "cache-control": `max-age=3600` }

	const { data, error } = await supabase
		.from(gamesTable)
		.select("slug")
		.order("created_at", { ascending: false })

	if (error) throw new Error(error.message)

  return new Response(JSON.stringify(data), { headers })
}
