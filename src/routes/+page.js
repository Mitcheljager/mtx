import { browser } from "$app/environment"
import { api } from "$lib/api"
import { get } from "svelte/store"
import { games, currentPage, reachedEnd } from "$lib/stores/games"

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, url }) {
	const query = url.searchParams.get("search")
	const page = browser && get(currentPage) ? get(currentPage) : parseInt(url.searchParams.get("page") || 1)

	const path = query ? `search?query=${query}` : `games?page=${page}`
	const data = browser && get(games)?.length ? get(games) : await api(path, fetch)

	return {
		games: data || [],
		page,
		reachedEnd: browser && get(reachedEnd)
	}
}
