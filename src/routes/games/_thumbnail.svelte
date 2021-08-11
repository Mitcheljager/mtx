<script lang="ts">
  import supabase from "$lib/db"

  import { images } from "../../stores/images"

  export let game
  export let width = 160
  export let height = 213

  let src: string

  $: if (game?.image_url) downloadImage()

  // Fallback for parsers to prevent errors. This doesn't do anything in modern browsers.
  function noOp () { }
  if (typeof URL.createObjectURL === "undefined") { 
    Object.defineProperty(URL, "createObjectURL", { value: noOp })
  }

  async function downloadImage() {
    if ($images[game.id]) {
      src = $images[game.id]
      return
    }

    try {
      const { data, error } = await supabase
			.storage
			.from("games")
			.download(game.image_url.split("games/")[1])

      if (error) throw error
      
      src = URL.createObjectURL(data)
      $images[game.id] = src
    } catch (error) {
      console.error(error)
    }
  }
</script>



<img
  loading="lazy"
  alt={ game.title }
  { width }
  { height }
  { src } />



<style>
  img {
    display: block;
    width: 100%;
    height: auto;
    color: var(--text-color-dark);
    font-size: .75rem;
  }
</style>
