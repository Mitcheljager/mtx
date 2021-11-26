/**
 * Can be made globally available by placing this
 * inside `global.d.ts` and removing `export` keyword
 */
export interface Locals {
	userid: string;
}

export type Game = {
  id?: string,
  title: string,
  description?: string,
  publisher?: string,
  year_of_release?: number,
  image_url?: string,
  slug?: string,
  categories?: Category[]
}

export type Category = {
  id?: string,
  title: string,
  type: string,
  description: string
}

export type GameCategory = {
  game_id: string,
  category_id: string,
  created_at: string
}
