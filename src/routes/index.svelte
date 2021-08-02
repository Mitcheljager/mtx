<script context="module" lang="ts">
	export const prerender = true
</script>

<script lang="ts">
	import supabase from "$lib/db"

	import { fade } from "svelte/transition"

	import Game from "./games/_game.svelte"
	
	async function getData() {
		const { data, error } = await supabase
			.from("games")
			.select(`
				id, title,
				categories (id, title, type)
			`)
			.limit(20)
			
		if (error) throw new Error(error.message)

		return data
	}
</script>



<svelte:head>
	<title>Home</title>
</svelte:head>



<div class="cards">
	{ #await getData() }
		{ #each { length: 20 } as _ }
			<Game loading={ true } />
		{ /each }
	{ :then data }
		{ #each data as game }
			<div in:fade={{ duration: 150 }}>
				<Game { game } />
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
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 1.5rem;
  }

	@keyframes loading {
		from {
			transform: translateX(-100%);
		}

		to {
			transform: translateX(100%);
		}
	}
</style>
