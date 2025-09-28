import type { Category } from "$lib/types/Category";

export function sortedCategories(categories: Category[]): Category[] {
  return categories.sort((a, b) => {
    if (a.type !== b.type) return a.type > b.type ? 1 : -1;
    return a.id > b.id ? 1 : -1;
  });
}
