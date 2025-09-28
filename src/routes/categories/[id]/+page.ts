import { error } from "@sveltejs/kit";
import { api } from "$lib/api";
import type { PageLoad } from "./$types";
import type { Category } from "$lib/types/Category";
import type { Game } from "$lib/types/Game";

export const load : PageLoad = async ({ params, fetch }) => {
  const { id } = params;

  const [category, games] = (await Promise.allSettled([
    api<Category>(`categories/${id}`, fetch),
    api<Game[]>(`games/category/${id}`, fetch)
  ])).map(p => {
    // @ts-expect-error Shut up
    return p.value
  });

  return { category, games };
};
