import { browser } from "$app/environment"
import { api } from "$lib/api"
import { get } from "svelte/store"
import { games, currentPage, reachedEnd } from "$lib/stores/games"
import type { PageLoad } from './$types'
import type { Game } from "$lib/types/Game"

export const load : PageLoad = async ({ fetch, url, depends }) => {
	depends("games:index")

	const query = url.searchParams.get("search")
	const page = browser && get(currentPage) ? get(currentPage) : parseInt(url.searchParams.get("page") || "1")

	const path = query ? `search?query=${query}` : `games?page=${page}`
	const data = browser && get(games)?.length ? get(games) : await api<Game[]>(path, fetch)

	return {
		games: data || [],
		page,
		reachedEnd: browser && get(reachedEnd)
	}
}
