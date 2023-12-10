import { getGames, getGamesBySearch } from "$lib/stores/games"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const data = params.search ? await getGamesBySearch(params.search) : await getGames()

	return {
		_games: data
	}
}
