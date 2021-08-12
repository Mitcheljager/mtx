import { readable, writable, get } from "svelte/store"

import supabase from "$lib/db"

export const games = writable([])
export const currentPage = writable(0)
export const itemsPerPage = readable(18)
export const reachedEnd = writable(false)

const table = "games"
const select = `
  id, title, publisher, year_of_release, image_url, slug,
  categories (id, title, type)`

export async function getGames() {
  const startOfRange: number = get(currentPage) * get(itemsPerPage)
  const endOfRange: number = startOfRange + (get(itemsPerPage) - 1)

  const { data, error } = await supabase
  .from(table)
  .select(select)
  .order("created_at", { ascending: false })
  .range(startOfRange, endOfRange)
    
  if (error) throw new Error(error.message)
  reachedEnd.set(data.length < get(itemsPerPage))

  return data
}

export async function getGamesbySearch(query: string) {
  const { data, error } = await supabase
  .from(table)
  .select(select)
  .textSearch("title", query, {
    type: "websearch",
    config: "english"
  })
  .limit(6)
    
  if (error) throw new Error(error.message)

  reachedEnd.set(true)
  
  return data
}


export async function getGame(column: string, value: string) {
  const { data, error } = await supabase
  .from(table)
  .select(`
    id, description, title, publisher, year_of_release, image_url, slug,
    categories (id, title, type)
  `)
  .eq(column, value)
  .single()

  if (error) throw new Error(error.message)

  return data
}
