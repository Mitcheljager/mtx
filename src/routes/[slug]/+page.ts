import { error } from "@sveltejs/kit"
import { api } from "$lib/api"
import type { PageLoad } from './$types'

export const load : PageLoad = async ({ params, fetch }) => {
	let game

	try {
		game = await api(`game/slug/${params.slug}`, fetch)
		if (!game) throw new Error()
	} catch {
		throw error(404, { message: "Not found" })
	}

	return {
		game
	}
}
