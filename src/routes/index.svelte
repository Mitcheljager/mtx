<script context="module" lang="ts">
	export const prerender = true
	
	export async function load() {
		return {
      props: { _games: await getGames() }
    }
	}
</script>

<script lang="ts">
	import { getGames, games, currentPage, reachedEnd } from "../stores/games"

	import Game from "./games/_game.svelte"
	import Search from "./_search.svelte"

	export let _games
	if (!$games.length) $games = _games

	let loadingMore = false
	
	async function getData() {
		let data: any

		try {
			data = await getGames()
		} catch(error) {
			throw new Error(error.message)
		}

		$games = [...$games, ...data]
	}

	async function getNextPage() {
		$currentPage += 1

		loadingMore = true

		await getData()

		loadingMore = false
	}
</script>



<svelte:head>
	<title>Macrotransactions - Highlighting monetisation in popular games</title>
</svelte:head>



<center>
	<h1><mark>Macro</mark>transactions</h1>

	<big>Monetisation in games can be <mark>unethical</mark>, <mark>predatory</mark>, and <mark>exploitative</mark>. This website highlights monetisation practises in popular games.</big>
</center>

<Search />

<div class="cards" class:cards--single={ $games?.length == 1 }>
	{ #if $games }
		{ #each $games as game (game.id) }
			<Game { game } />
		{ /each }
	{ /if }
</div>

{ #if !$reachedEnd }
	<div class="tray mt-1/1">
		<button class="button button--large" class:button--primary={ !loadingMore } on:click={ getNextPage } disabled={ loadingMore }>
			{ loadingMore ? "Loading..." : "Load more" }
		</button>
	</div>
{ /if }



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

	.tray {
		display: flex;
		justify-content: center;
	}

	.button--large {
		width: 100%;
		max-width: clamp(200px, 100%, 25%);
		padding: 1rem 3rem;
	}
</style>
