import { getGames, getGamesBySearch } from "$lib/stores/games"

/** @type {import('./$types').PageLoad} */
export async function load({ url }) {
	const query = url.searchParams.get("search")
	const page = parseInt(url.searchParams.get("page") || 0) // Start at 0

	const data = query ? await getGamesBySearch(query) : await getGames(page)

	return {
		games: data,
		page,
	}
}
