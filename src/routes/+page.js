import { api } from "$lib/api"

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, url }) {
	const query = url.searchParams.get("search")
	const page = parseInt(url.searchParams.get("page") || 1)

	const path = query ? `search?query=${query}` : `games?page=${page}`
	const data = await api(path, fetch)

	return {
		games: data || [],
		page,
	}
}
