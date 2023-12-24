import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
	// @ts-ignore
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_ANON_KEY
)

export async function createGame(properties) {
	const { data, error } = await supabase.from("games").insert([properties]).select()

	if (error) throw new Error(error.message)

	return data
}

export async function updateGame(properties) {
	const { data, error } = await supabase.from("games").update(properties).eq("id", properties.id).select()

	if (error) throw new Error(error.message)

	return data
}

export async function createCategory(properties) {
	const { data, error } = await supabase.from("categories").insert([properties]).select()

	if (error) throw new Error(error.message)

	return data
}

export async function createGameCategory(category_id, game_id) {
	const { data, error } = await supabase.from("game_category").insert([{ category_id, game_id }])

	if (error) throw new Error(error.message)

	return data
}

export async function destroyGameCategory(category_id, game_id) {
	const { data, error } = await supabase
		.from("game_category")
		.delete()
		.match({ category_id, game_id })

	if (error) throw new Error(error.message)

	return data
}

export async function uploadImage(file, filename) {
	const { data, error } = await supabase.storage.from("games").upload(filename, file)

	if (error) throw new Error(error.message)

	return data
}
