<script context="module" lang="ts">
	export const prerender = true
	
	export async function load() {
		return {
      props: { _games: await getGames() }
    }
	}
</script>



<script lang="ts">
  import { fade } from "svelte/transition"

	import { loading, getGames, games, currentPage, reachedEnd, searchQuery } from "../stores/games"

	import Games from "./games/_games.svelte"
	import Search from "./games/_search.svelte"
	import Filter from "./games/_filter.svelte"

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

<div class="bar">
	<Filter />
	<Search />
</div>

<Games games={ $games } />

{ #if !$games.length && !$loading }
  <center in:fade={{ duration: 150 }}><em>No results found.</em></center>
{ /if }

{ #if $loading }
  <div class="loading" in:fade={{ duration: 500 }}>
    <div class="spinner"></div>
  </div>
{ /if }

{ #if !$reachedEnd && !$searchQuery && !$loading }
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

	.bar {
		display: grid;
		grid-template-columns: 3fr 1fr;
		grid-gap: 1.5rem;
    margin: clamp(3rem, 10vw, 5rem) 0 3rem;
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

	.loading {
    display: flex;
    align-items: center;
    justify-content: center;
		margin-top: 3rem;
  }

  @keyframes spinner {
    from {
      width: 0;
      height: 0;
      opacity: 1;
      box-shadow: inset 0 0 0 .25rem var(--text-color);
    }

    to {
      width: 100%;
      height: 100%;
      opacity: 0;
      box-shadow: inset 0 0 0 .75rem var(--text-color);
    }
  }

  .spinner {
    position: relative;
    width: 10rem;
    height: 10rem;

    &::before,
    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      width: 0;
      height: 0;
      border-radius: 50%;
      animation: spinner 1200ms cubic-bezier(0, .25, .75, 1) infinite forwards;
    }

    &::after {
      animation-delay: 600ms;
    }
  }
</style>
