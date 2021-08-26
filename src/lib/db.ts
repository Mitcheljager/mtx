import { createClient } from "@supabase/supabase-js"

import type { Game, Category, GameCategory } from "$lib/types"

const supabase = createClient(
  // @ts-ignore
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export async function createGame(properties: Game): Promise<Game[]> {
  const { data, error } = await supabase
  .from("games")
  .insert([properties])

  if (error) throw new Error(error.message)

  return data
}

export async function updateGame(properties: Game): Promise<Game[]> {
  const { data, error } = await supabase
  .from("games")
  .update(properties)
  .eq("id", properties.id)

  if (error) throw new Error(error.message)

  return data
}

export async function createCategory(properties: Category): Promise<Category[]> {
  const { data, error } = await supabase
  .from("categories")
  .insert([properties])

  if (error) throw new Error(error.message)

  return data
}

export async function createGameCategory(category_id: string, game_id: string): Promise<GameCategory[]> {
  const { data, error } = await supabase
  .from("game_category")
  .insert([{ category_id, game_id }])

  if (error) throw new Error(error.message)

  return data
}

export async function destroyGameCategory(category_id: string, game_id: string): Promise<GameCategory[]> {
  const { data, error } = await supabase
    .from("game_category")
    .delete()
    .match({ category_id, game_id })

  if (error) throw new Error(error.message)

  return data
}

export async function uploadImage(file: File, filename: string) {
  const { data, error } = await supabase
  .storage
  .from("games")
  .upload(filename, file)

  if (error) throw new Error(error.message)

  return data
}

export default supabase
