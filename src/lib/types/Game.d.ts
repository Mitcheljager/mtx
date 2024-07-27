import type { Category } from "./Category"

export interface Game {
  id: string,
  title: string,
  slug: string,
  publisher: string,
  image_url: string,
  categories: Array<Category>,
  tentative: boolean | null,
  year_of_release: number,
  description?: string,
}
