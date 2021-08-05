import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export type Game = {
  id?: string,
  title: string,
  publisher: string,
  year_of_release: number,
  image_url?: string,
  categories?: Category[]
}

export type Category = {
  id: string,
  title: string,
  type: string
}

export const createGame = async (properties: Game) => {
  const { data, error } = await supabase
  .from("games")
  .insert([properties])

  if (error) throw new Error(error.message)

  return data
}

export const createGameCategory = async (category_id: string, game_id: string) => {
  const { data, error } = await supabase
  .from("game_category")
  .insert([{ category_id, game_id }])

  if (error) throw new Error(error.message)

  return data
}

export const destroyGameCategory = async (category_id: string, game_id: string) => {
  const { data, error } = await supabase
    .from("game_category")
    .delete()
    .match({ category_id, game_id })

  if (error) throw new Error(error.message)

  return data
}

export const uploadImage = async (file, filename: string) => {
  const { data, error } = await supabase
  .storage
  .from("games")
  .upload(filename, file)

  if (error) throw new Error(error.message)

  return data
}

export default supabase
