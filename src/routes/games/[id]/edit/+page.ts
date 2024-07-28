import { error } from "@sveltejs/kit"
import { api } from "$lib/api"
import type { PageLoad } from './$types'
import type { Game } from "$lib/types/Game"

export const load : PageLoad = async ({ params, fetch }) => {
	let data

	try {
		data = await api<Game>(`game/id/${params.id}`, fetch)
		if (!data) throw new Error
	} catch {
		throw error(404, { message: "Not found" })
	}

	return {
		game: data
	}
}
