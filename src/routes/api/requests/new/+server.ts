import { createRequest } from '$lib/db';

export async function POST({ request }): Promise<void> {
  try {
    const { title, description } = await request.json();

    if (!title) throw new Error("No title was given");
    if (title.length > 100) throw new Error("Title too long");
    if (title.description > 100) throw new Error("Description too long");

    createRequest({ title, description });
  } catch(error: any) {
    console.error(error);
    error(500, error.message);
  }
}
