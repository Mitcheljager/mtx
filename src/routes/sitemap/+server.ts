import { api } from "$lib/api"
import type { Game } from "$lib/types/Game"
import type { RequestEvent } from "./$types"

export async function GET({ setHeaders } : RequestEvent) {
	const host = "macrotransactions.org"

	const data = await api<Game[]>("/sitemap")

	setHeaders({
		"Cache-Control": "max-age=14400",
		"Content-Type": "application/xml"
	})

	const body = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
          xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

      <url>
        <loc>https://${host}</loc>
        <changefreq>daily</changefreq>
        <priority>1.00</priority>
      </url>

      <url>
        <loc>https://${host}/about</loc>
        <priority>0.9</priority>
      </url>

      <url>
        <loc>https://${host}/privacy</loc>
        <priority>0.9</priority>
      </url>

      ${data.map((game) => `
        <url>
          <loc>https://${host}/${game.slug}</loc>
          <priority>0.8</priority>
        </url>
      `).join("")}
    </urlset>
  `

	return new Response(body)
}
