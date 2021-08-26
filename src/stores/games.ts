
import { readable, writable, get } from "svelte/store"

import supabase from "$lib/db"
import type { Game } from "$lib/types"
import { sortedCategories } from "./categories"

export const games = writable([])
export const currentPage = writable(0)
export const itemsPerPage = readable(18)
export const reachedEnd = writable(false)
export const searchQuery = writable("")

const table = "games"
const select = `
  id, title, publisher, year_of_release, image_url, slug,
  categories (id, title, type)`

export async function getGames(): Promise<Game[]> {
  const startOfRange: number = get(currentPage) * get(itemsPerPage)
  const endOfRange: number = startOfRange + (get(itemsPerPage) - 1)

  const { data, error } = await supabase
  .from(table)
  .select(select)
  .order("created_at", { ascending: false })
  .range(startOfRange, endOfRange)
    
  if (error) throw new Error(error.message)

  data.forEach(game => game.categories = sortedCategories(game.categories))

  reachedEnd.set(data.length < get(itemsPerPage))

  return data
}

export async function getGamesbySearch(column: string, query: string): Promise<Game[]> {
  const { data, error } = await supabase
  .from(table)
  .select(select)
  .textSearch(column, query, {
    type: "websearch",
    config: "english"
  })
  .limit(6)
    
  if (error) throw new Error(error.message)

  data.forEach(game => game.categories = sortedCategories(game.categories))

  reachedEnd.set(true)
  
  return data
}

export async function getGame(column: string, value: string): Promise<Game[]> {
  const { data, error } = await supabase
  .from(table)
  .select(`
    id, description, title, publisher, year_of_release, image_url, slug,
    categories (id, title, type)
  `)
  .eq(column, value)
  .single()

  if (error) throw new Error(error.message)
  
  data.categories = sortedCategories(data.categories)

  return data
}

export async function getSitemapData(): Promise<Game[]> {
  const { data, error } = await supabase
  .from(table)
  .select("slug")
  .order("created_at", { ascending: false })
    
  if (error) throw new Error(error.message)

  return data
}
