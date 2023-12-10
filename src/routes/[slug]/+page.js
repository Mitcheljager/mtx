import { error } from "@sveltejs/kit"
import { getGame } from "$lib/stores/games"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	let data

	try {
		data = await getGame("slug", params.slug)
	} catch {
		throw error(404, { message: "Not found" })
	}

	return {
		game: data
	}
}
