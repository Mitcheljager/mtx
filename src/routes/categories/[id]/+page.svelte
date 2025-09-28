<script lang="ts">
  import Category from "$lib/components/Category.svelte";
  import Game from "$lib/components/Game.svelte";

  const { data } = $props();

  const { category, games } = $derived(data);
</script>

<h1>All games with category</h1>

<div class="wrapper">
  <Category {category} />
</div>

<div class="cards">
  {#each games as game (game.id)}
    <Game {game} />
  {/each}
</div>

<style lang="scss">
  .wrapper {
    margin: 0 0 2rem;
  }

  .cards {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(clamp(250px, 45vw, 350px), 1fr));
		grid-gap: 1.5rem;
		grid-template-rows: masonry;
	}
</style>
