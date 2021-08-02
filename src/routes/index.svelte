<script context="module" lang="ts">
	export const prerender = true
</script>

<script lang="ts">
	import supabase from "$lib/db"
	
	async function getData() {
		const { data, error } = await supabase
			.from("games")
			.select()
			
		if (error) throw new Error(error.message)
		
		return data
	}
</script>



<svelte:head>
	<title>Home</title>
</svelte:head>



<div class="cards">
	{ #await getData() }
		<p>Fetching data...</p>
	{ :then data }
		{ #each data as game }
			<div class="card">
				{ game.title }
			</div>
		{ /each }
	{ :catch error }
		<p>Something went wrong while fetching the data:</p>
		<pre>{ error }</pre>
	{ /await }
</div>



<style lang="scss">
	.cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 1rem;
  }

	.card {
		position: relative;
		display: block;
		padding: 1.5rem;
		border-radius: 1rem;
		background: var(--bg-dark);
		box-shadow: var(--shadow-medium);
	}

	.card__header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;

		h3 {
			margin: 0 0 1rem;
		}
	}
</style>
