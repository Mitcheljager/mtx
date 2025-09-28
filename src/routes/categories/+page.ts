import { error } from "@sveltejs/kit";
import { api } from "$lib/api";
import type { PageLoad } from "./$types";
import type { Category } from "$lib/types/Category";

export const load : PageLoad = async ({ fetch }) => {
  let data;

  try {
    data = await api<Category[]>('categories', fetch);
    if (!data) throw new Error;
  } catch {
    throw error(404, { message: "Not found" });
  }

  return {
    categories: data
  };
};
