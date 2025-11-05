import { createRequest } from '$lib/db';
import { json, error } from '@sveltejs/kit';

export async function POST({ request }) {
  try {
    const { title, description } = await request.json();

    if (!title) throw new Error("No title was given");
    if (title.length > 100) throw new Error("Title too long");
    if (title.description > 500) throw new Error("Description too long");

    await createRequest({ title, description });

    return json({ success: true });
  } catch(_error: any) {
    console.error(_error);
    error(500, _error.message);
  }
}
