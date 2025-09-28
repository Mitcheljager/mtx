import { error } from "@sveltejs/kit";
import { api } from "$lib/api";
import type { PageLoad } from "./$types";
import type { Category } from "$lib/types/Category";
import type { Game } from "$lib/types/Game";

export const load : PageLoad = async ({ params, fetch }) => {
  const { id } = params;

  let category;
  let games;

  try {
    category = await api<Category>(`categories/${id}`, fetch);
    if (!category) throw new Error;

    games = await api<Game[]>(`games/category/${id}`, fetch);
  } catch {
    throw error(404, { message: "Not found" });
  }

  return { category, games };
};
