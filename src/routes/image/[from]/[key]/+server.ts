import { supabase } from "$lib/db";
import type { RequestEvent } from "./$types";

export async function GET({ params }: RequestEvent): Promise<Response> {
  const { data } = await supabase.storage.from(params.from).getPublicUrl(params.key);

  if (!data?.publicUrl) return new Response("Public URL not found", { status: 404 });

  const response = await fetch(data.publicUrl);
  if (!response.ok) return new Response("Error fetching image", { status: response.status });

  const imageBuffer = await response.arrayBuffer();
  const contentType = response.headers.get("Content-Type") || "image/jpeg";

  return new Response(imageBuffer, {
    headers: {
      "Content-Type": contentType,
      "cache-control": "604800"
    }
  });
}
