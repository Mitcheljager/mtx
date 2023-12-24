<script>
	import {
		getGames,
		games,
		currentPage,
		reachedEnd,
		itemsPerPage
	} from "$lib/stores/games"
	import { browser } from '$app/environment'
	import { page } from '$app/stores'

	import Game from "$lib/components/Game.svelte"
	import Search from "$lib/components/Search.svelte"

	export let data

	if (!browser || (browser && !$games?.length)) $games = data.games

	let loadingMore = false

	$: $currentPage = data.page || 0
	$: $reachedEnd = data.games.length < $itemsPerPage
	$: nextPageHref = `${$page.url.origin}/?page=${$currentPage + 1}`

	async function getData() {
		let data

		try {
			data = await getGames($currentPage)
		} catch (error) {
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
	<meta
		name="description"
		content="Macrotransactions highlights monetisation practices in popular games. Monetisation in games can be unethical, predatory, and exploitative. This website aims to make you aware of those practices."
	/>
</svelte:head>

<center>
	<h1 aria-label="Macrotransactions"><mark>Macro</mark>transactions</h1>

	<big
		>Monetisation in games can be <mark>unethical</mark>, <mark>predatory</mark>, and
		<mark>exploitative</mark>. This website highlights monetisation practices in popular games.</big
	>
</center>

<Search />

<div class="cards" class:cards--single={$games?.length == 1}>
	{#if $games}
		{#each $games as game (game.id)}
			<Game {game} />
		{/each}
	{/if}
</div>

{#if $reachedEnd}
	{#if $games?.length}
		<p class="mt-1/1 mb-1/1">
			<center>You've reached the end.</center>
		</p>
	{/if}
{:else if $games?.length}
	<div class="tray mt-1/1">
		<a
			href={nextPageHref}
			class="button button--large"
			class:button--primary={!loadingMore}
			data-sveltekit-preload-data="off"
			on:click|preventDefault={getNextPage}
			disabled={loadingMore || null}
			aria-busy={loadingMore}
		>
			{loadingMore ? "Loading..." : "Load more"}
	</a>
	</div>
{/if}

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
		grid-template-rows: masonry;

		&--single {
			max-width: 450px;
			margin: 0 auto;
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
