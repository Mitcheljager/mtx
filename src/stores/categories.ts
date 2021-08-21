import type { Category } from "$lib/types"

export function sortedCategories(categories: Category[]): Category[] {
  return categories.sort((a: Category, b: Category) => (a.type > b.type) ? 1 : -1)
}
