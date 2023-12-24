import { getGames, getGamesBySearch } from "$lib/stores/games"

/** @type {import('./$types').PageLoad} */
export async function load({ url }) {
	const query = url.searchParams.get("search")
	const page = (url.searchParams.get("page") || 1) - 1 // Start at 0

	const data = query ? await getGamesBySearch(query) : await getGames(page)

	return {
		games: data,
		page,
	}
}
