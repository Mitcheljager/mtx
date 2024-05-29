import { supabase } from "$lib/db"
import { gamesSelect, gamesTable, itemsPerPage } from "$lib/stores/games"
import { sortedCategories } from "$lib/stores/categories"

export async function GET({ url }) {
  const headers = { "cache-control": `max-age=3600` }

  const page = url.searchParams.get("page") || 1

  const startOfRange = (page - 1) * itemsPerPage
	const endOfRange = startOfRange + (itemsPerPage - 1)

	const { data, error } = await supabase
		.from(gamesTable)
		.select(gamesSelect)
		.order("created_at", { ascending: false })
		.range(startOfRange, endOfRange)

	if (error) throw new Error(error.message)

	data.forEach((game) => (game.categories = sortedCategories(game.categories)))

  return new Response(JSON.stringify(data), { headers })
}
