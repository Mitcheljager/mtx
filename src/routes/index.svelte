<script context="module" lang="ts">
	export const prerender = true
</script>

<script lang="ts">
	import supabase from "$lib/db"

	import { fade } from "svelte/transition"

	import { games } from "../stores/games"

	import Game from "./games/_game.svelte"
	import Search from "./_search.svelte"
	
	async function getData() {
		const { data, error } = await supabase
		.from("games")
		.select(`
			id, title, publisher, year_of_release,
			categories (id, title, type)
		`)
		.order("created_at", { ascending: false })
		.limit(20)
			
		if (error) throw new Error(error.message)

		$games = data
	}
</script>



<svelte:head>
	<title>Home</title>
</svelte:head>



<h1>Microtransactions</h1>

<Search />

<div class="cards">
	{ #await getData() }
		{ #each { length: 20 } as _ }
			<Game loading={ true } />
		{ /each }
	{ :then data }
		{ #each $games as game }
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
    grid-template-columns: repeat(auto-fill, minmax(clamp(250px, 45vw, 350px), 1fr));
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
