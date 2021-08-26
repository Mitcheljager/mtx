import { getGame } from "../../../stores/games"

export async function get({ params }) {
  let body: string
  
  try {
    const data: any = await getGame("slug", params.slug)

    body = `
      <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="670" viewBox="0 0 1200 670">
        <style>
          text {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
          }
        </style>

        <rect width="100%" height="100%" x="0" y="0" fill="#16181d" />

        <text
          x="50%"
          y="50%"
          dominant-baseline="middle"
          text-anchor="middle"
          fill="white"
          font-size="50">
            ${ data.title }
          </text>
      </svg>
    `
  } catch(error) {
    body = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 670">
        <text>Not found</text>
      </svg>
    `
  }

  return {
    body
  }
}
