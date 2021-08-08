import { createClient } from "@supabase/supabase-js"

import type { Game, Category } from "$lib/types"

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export const createGame = async(properties: Game) => {
  const { data, error } = await supabase
  .from("games")
  .insert([properties])

  if (error) throw new Error(error.message)

  return data
}

export const createCategory = async(properties: Category) => {
  const { data, error } = await supabase
  .from("categories")
  .insert([properties])

  if (error) throw new Error(error.message)

  return data
}

export const createGameCategory = async(category_id: string, game_id: string) => {
  const { data, error } = await supabase
  .from("game_category")
  .insert([{ category_id, game_id }])

  if (error) throw new Error(error.message)

  return data
}

export const destroyGameCategory = async(category_id: string, game_id: string) => {
  const { data, error } = await supabase
    .from("game_category")
    .delete()
    .match({ category_id, game_id })

  if (error) throw new Error(error.message)

  return data
}

export const uploadImage = async(file: any, filename: string) => {
  const { data, error } = await supabase
  .storage
  .from("games")
  .upload(filename, file)

  if (error) throw new Error(error.message)

  return data
}

export default supabase
