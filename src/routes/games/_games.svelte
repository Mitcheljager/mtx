<script lang="ts">
  import Game from "./_game.svelte"

  export let games
</script>



<div class="cards" class:cards--single={ games?.length == 1 }>
	{ #if games && games.length }
		{ #each games as game (game.id) }
			<Game { game } />
		{ /each }
	{ /if }
</div>



<style lang="scss">
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(clamp(250px, 45vw, 350px), 1fr));
    grid-gap: 1.5rem;
		
		&--single:global(> div) {
			grid-column: 2;
		}
  }
</style>
