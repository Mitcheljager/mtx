import { writable, type Writable } from "svelte/store";

import type { Game } from "$lib/types/Game";

export const games: Writable<Game[]> = writable([]);
export const currentPage: Writable<number> = writable(0);
export const reachedEnd = writable(false);

export const itemsPerPage = 36;
export const gamesTable = "games";
export const gamesSelect = `
  id, title, publisher, year_of_release, image_url, slug, tentative,
  categories (id, title, type)`;
