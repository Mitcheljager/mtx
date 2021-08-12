<script context="module" lang="ts">
  import { getGame } from "../../stores/games"

	export const prerender = true

  export async function load({ page }) {
		const data = await getGame("id", page.params.id)

    if (!data) return { status: 404, error: "Not found" }

    return {
      props: { game: data }
    }
	}
</script>

<script lang="ts">
  import type { Game } from "$lib/types"

  import Form from "./_form.svelte"

  export let game: Game
</script>



<div class="wrapper">
  <h2>Edit game "{ game.title }"</h2>
    
  <Form { game } />
</div>



<style lang="scss">
  h2 {
    text-align: center;
  }
</style>
