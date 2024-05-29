import { writable } from "svelte/store"

import { supabase } from "$lib/db"

export const games = writable([])
export const currentPage = writable(0)
export const reachedEnd = writable(false)

export const itemsPerPage = 36
export const gamesTable = "games"
export const gamesSelect = `
  id, title, publisher, year_of_release, image_url, slug, tentative,
  categories (id, title, type)`

export async function getSitemapData() {
	const { data, error } = await supabase
		.from(gamesTable)
		.select("slug")
		.order("created_at", { ascending: false })

	if (error) throw new Error(error.message)

	return data
}
