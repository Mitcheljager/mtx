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
			id, title, publisher, year_of_release, image_url,
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



<center>
	<h1><mark>Macro</mark>transactions</h1>

	<big>Monetisation in games can be <mark>unethical</mark>, <mark>predatory</mark>, and <mark>exploitative</mark>. This website highlights monetisation practises in popular games.</big>
</center>

<Search />

<div class="cards" class:cards--single={ $games?.length == 1 }>
	{ #await getData() }
		{ #each { length: 20 } as _ }
			<Game loading={ true } />
		{ /each }
	{ :then data }
		{ #each $games as game (game.id) }
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
	center {
		max-width: clamp(300px, 100%, 50%);
		margin: 0 auto;
	}

	h1 {
		text-align: center;
		text-transform: lowercase;
		font-size: clamp(2rem, 5vw, 4rem);
	}

	big {
		display: block;
		max-width: 620px;
	}

	.cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(clamp(250px, 45vw, 350px), 1fr));
    grid-gap: 1.5rem;

		&--single:global(> div) {
			grid-column: 2;
		}
  }
</style>
