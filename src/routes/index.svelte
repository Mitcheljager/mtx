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

	<big>Monetisation in games can be <mark>predatory</mark>, <mark>exploitative</mark>, and <mark>unethical</mark>. This website highlights monetisation in popular games.</big>
</center>

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
	center {
		max-width: clamp(300px, 100%, 50%);
		margin: 0 auto;
	}

	h1 {
		margin: clamp(3rem, 10vw, 6rem) 0 2rem;
		padding: 0;
		font-size: clamp(2rem, 5vw, 4rem);
		text-align: center;
		text-transform: lowercase;
		text-shadow: var(--shadow-big);
	}

	big {
		display: block;
		max-width: 620px;
	}

	mark {
		background: transparent;
		color: var(--primary);
		font-weight: 800;
	}

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
