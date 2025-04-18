<script lang="ts">
	import { games, currentPage, reachedEnd, itemsPerPage } from "$lib/stores/games"
	import { api } from "$lib/api"
	import { page } from "$app/stores"

	import type { Game as GameType } from "$lib/types/Game"
	import Game from "$lib/components/Game.svelte"
	import Search from "$lib/components/Search.svelte"

	interface Props { data: any }

	const { data } : Props = $props()

	setStoresFromData()

	$effect(setStoresFromData)

	let loading = $state(false)
	let nextPageHref = $derived(`${$page.url.origin}/?page=${$currentPage + 1}`)

	async function getNextPage(event: Event) {
		event.preventDefault()

		if (loading) return

		loading = true

		try {
			const response = await api<GameType[]>(`games?page=${$currentPage + 1}`)

			$currentPage += 1
			$reachedEnd = response.length < itemsPerPage

			// Filter out potential duplicates in case of caching
			const filteredResponse = response.filter(r => !$games.find(g => g.id === r.id))

			$games = [...$games, ...filteredResponse]
		} catch (error: any) {
			throw new Error(error?.message)
		} finally {
			loading = false
		}
	}

	function setStoresFromData() {
		$games = data.games
		$currentPage = data.page || 1
		$reachedEnd = data.games.length < itemsPerPage
	}
</script>

<svelte:head>
	<title>Macrotransactions - Highlighting monetisation in popular games</title>
	<meta
		name="description"
		content="Macrotransactions highlights monetisation practices in popular games. Monetisation in games can be unethical, predatory, and exploitative. This website aims to make you aware of those practices." />
</svelte:head>

<center>
	<h1 aria-label="Macrotransactions"><mark>Macro</mark>transactions</h1>

	<big>
		Monetisation in games can be <mark>unethical</mark>, <mark>predatory</mark>, and
		<mark>exploitative</mark>. This website highlights monetisation practices in popular games.
	</big>
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
	{#if $games?.length && !loading}
		<center>
			<p class="mt-1/1">
				You have reached the end.
			</p>

			<p class="mb-1/1 color-dark"><em>Not able to find your game?</em> <a href="/requests/new">Submit a request</a></p>
		</center>
	{/if}
{:else if $games?.length}
	<div class="tray mt-1/1" role="status" aria-live="polite">
		<a
			href={nextPageHref}
			class="button button--large"
			class:button--primary={!loading}
			aria-label="Load more games"
			data-sveltekit-preload-data="off"
			onclick={getNextPage}>
			{loading ? "Loading..." : "Load more"}
	</a>
	</div>
{/if}

<div class="page-background"></div>

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

	.page-background {
		position: absolute;
		top: 0;
		left: 0;
		height: 50vh;
		width: 100%;
		background: linear-gradient(to bottom, var(--primary), transparent);
		z-index: -1;
		opacity: 0.15;
	}
</style>
