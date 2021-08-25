import type { Game } from "$lib/types"
import { getGames } from "../stores/games"

export async function get({ host }) {
  const games: Game[] = await getGames()

  const headers = {
    "Cache-Control": "max-age=14400",
    "Content-Type": "application/xml",
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
          xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

      <url>
        <loc>${ host }</loc>
        <changefreq>daily</changefreq>
        <priority>1.00</priority>
      </url>

      <url>
        <loc>${ host }/about</loc>
        <priority>0.9</priority>
      </url>

      <url>
        <loc>${ host }/privacy</loc>
        <priority>0.9</priority>
      </url>

      ${ games.map(game => `
        <url>
          <loc>${ host }/${ game.slug }</loc>
          <priority>0.8</priority>
        </url>
      `).join("") }
    </urlset>
  `

  return {
    headers,
    body
  }
}
