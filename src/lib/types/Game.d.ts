import type { Category } from "./Category"

export interface Game {
  id: string,
  title: string,
  slug: string,
  publisher: string,
  image_url: string,
  tentative: boolean | null,
  year_of_release: number,
  categories: Category[],
  description?: string,
}

export type GameForm = Omit<Game, "id" | "categories"> & Partial<Pick<Game, "id">>
