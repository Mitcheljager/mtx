import { error } from "@sveltejs/kit"
import { api } from "$lib/api"

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
	let data

	try {
		data = await api(`game/id/${params.id}`, fetch)
		if (!data) throw new Error
	} catch {
		throw error(404, { message: "Not found" })
	}

	return {
		game: data
	}
}
