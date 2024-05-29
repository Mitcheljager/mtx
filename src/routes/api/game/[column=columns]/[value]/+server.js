import { supabase } from "$lib/db"
import { gamesTable } from "$lib/stores/games"
import { sortedCategories } from "$lib/utils/categories"

export async function GET({ params }) {
  const headers = { "cache-control": `max-age=3600` }
	const { column, value } = params

  const { data, error } = await supabase
		.from(gamesTable)
		.select(`
      id, description, title, publisher, year_of_release, image_url, slug, tentative,
      categories (id, title, type)
    `)
		.eq(column, value)
		.single()

	if (error) throw new Error(error.message)

  data.categories = sortedCategories(data.categories)

  return new Response(JSON.stringify(data), { headers })
}
