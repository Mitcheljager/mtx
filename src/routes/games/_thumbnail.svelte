<script lang="ts">
  import { onMount } from "svelte"

  import supabase from "$lib/db"
  import type { Game } from "$lib/types"

  import { images } from "../../stores/images"

  export let game: Game
  export let width = 160
  export let height = 213

  let src: string
  let initiatedLoad = false

  let element: HTMLElement

  onMount(lazyLoad)

  function lazyLoad() {
    if (!game.image_url || initiatedLoad) return
    if (element.getBoundingClientRect().top - window.innerHeight > window.innerHeight / 2) return

    downloadImage()
  }

  async function downloadImage() {
    initiatedLoad = true

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

  // Fallback for parsers to prevent errors. This doesn't do anything in modern browsers.
  function noOp () { }
  if (typeof URL.createObjectURL === "undefined") { 
    Object.defineProperty(URL, "createObjectURL", { value: noOp })
  }
</script>



<svelte:window on:scroll={ lazyLoad } />



<img
  loading="lazy"
  alt={ game.title }
  bind:this={ element }
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
