import { createRequest } from "$lib/db";
import { error, json } from "@sveltejs/kit";
import type { RequestEvent } from "../$types.js";

export async function POST({ request } : RequestEvent) {
  try {
    const { title, description } = await request.json();

    if (!title) throw new Error("No title was given");
    if (title.length > 100) throw new Error("Title too long");
    if (title.description > 100) throw new Error("Description too long");

    const data = createRequest({ title, description });

    return json(data);
  } catch(e: any) {
    console.error(e);
    error(500, e.message);
  }
}
