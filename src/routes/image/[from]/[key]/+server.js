import { supabase } from "$lib/db";

export async function GET({ params }) {
  const { data, error } = await supabase.storage.from(params.from).getPublicUrl(params.key)
  if (error) return new Response(error.message, { status: 500 })

  if (!data.publicUrl) return new Response("Public URL not found", { status: 404 })

  const response = await fetch(data.publicUrl)
  if (!response.ok) return new Response("Error fetching image", { status: response.status })

  const imageBuffer = await response.arrayBuffer()
  const contentType = response.headers.get("Content-Type") || "image/jpeg"

  return new Response(imageBuffer, {
    headers: {
      "Content-Type": contentType
    }
  })
}
