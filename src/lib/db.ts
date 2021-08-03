import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export type Game = {
  title: string,
  publisher: string,
  year_of_release: number,
  categories: Category[]
}

export type Category = {
  title: string,
  type: string
}

export default supabase
