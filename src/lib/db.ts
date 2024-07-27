import { createClient } from "@supabase/supabase-js"
import type { GameForm } from "$lib/types/Game"
import type { CreateCategory } from "$lib/types/Category"

export const supabase = createClient(
	// @ts-ignore
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_ANON_KEY
)

export async function createGame(properties: GameForm) {
	const { data, error } = await supabase.from("games").insert([properties]).select()

	if (error) throw new Error(error.message)

	return data
}

export async function updateGame(properties: GameForm) {
	const { data, error } = await supabase.from("games").update(properties).eq("id", properties.id).select()

	if (error) throw new Error(error.message)

	return data
}

export async function createCategory(properties: CreateCategory) {
	const { data, error } = await supabase.from("categories").insert([properties]).select()

	if (error) throw new Error(error.message)

	return data
}

export async function createGameCategory(category_id: string, game_id: string) {
	const { data, error } = await supabase.from("game_category").insert([{ category_id, game_id }])

	if (error) throw new Error(error.message)

	return data
}

export async function destroyGameCategory(category_id: string, game_id: string) {
	const { data, error } = await supabase
		.from("game_category")
		.delete()
		.match({ category_id, game_id })

	if (error) throw new Error(error.message)

	return data
}

export async function uploadImage(file: File, filename: string) {
	const { data, error } = await supabase.storage.from("games").upload(filename, file)

	if (error) throw new Error(error.message)

	return data
}
