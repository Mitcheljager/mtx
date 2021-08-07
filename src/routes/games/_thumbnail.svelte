<script lang="ts">
  import supabase from "$lib/db"

  export let game
  export let width = 160
  export let height = 213

  let src: string

  $: if (game?.image_url) downloadImage()

  async function downloadImage() {
    try {
      const { data, error } = await supabase
			.storage
			.from("games")
			.download(game.image_url.split("games/")[1])

      if (error) throw error
      
      src = URL.createObjectURL(data)
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
