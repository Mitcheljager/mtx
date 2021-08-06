<script lang="ts">
  import supabase from "$lib/db"

  export let game

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
  alt={ game.title }
  { src } />



<style>
  img {
    display: block;
    width: 100%;
    height: auto;
  }
</style>
