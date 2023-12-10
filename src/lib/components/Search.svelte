<script>
	import { fade } from "svelte/transition"
	import { onMount } from "svelte"

	import { currentPage, games, getGames, getGamesBySearch, searchQuery } from "$lib/stores/games"

	let debounce = null
	let loading = false

	$: value = $searchQuery
	$: if ($searchQuery) getData()

	onMount(getCurrentUrlParam)

	function getData() {
		loading = true

		$games = []

		clearTimeout(debounce)

		try {
			debounce = setTimeout(async () => {
				$searchQuery = value
				$currentPage = 0

				let data = null

				if (value) data = await getGamesBySearch(value)
				if (!value) data = await getGames()

				$games = data

				loading = false

				setUrlParam()
			}, 500)
		} catch (error) {
			alert("Something went wrong!")
		}
	}

	function setUrlParam() {
		if (!value) {
			window.history.replaceState({}, "", location.pathname)
			return
		}

		const params = new URLSearchParams(location.search)
		params.set("search", value)

		params.toString()

		window.history.replaceState({}, "", `${location.pathname}?${params.toString()}`)
	}

	function getCurrentUrlParam() {
		const urlParams = new URLSearchParams(window.location.search)

		if (urlParams.has("search")) $searchQuery = urlParams.get("search")
	}
</script>

<input
	class="search form-input form-input--large"
	type="text"
	placeholder="Search..."
	autocomplete="off"
	on:input={getData}
	bind:value
/>

{#if $searchQuery && !$games.length && !loading}
	<center in:fade={{ duration: 150 }}><em>No matches were found for your search query</em></center>
{/if}

{#if loading}
	<div class="loading" in:fade={{ duration: 500 }} aria-busy="true">
		<div class="spinner"></div>
	</div>
{/if}

<style lang="scss">
	input {
		display: block;
		position: relative;
		max-width: clamp(300px, 100%, 50%);
		margin: clamp(3rem, 10vw, 5rem) auto;
		background: var(--content-bg);
		box-shadow: var(--shadow-big);

		&::placeholder {
			font-size: 1.5rem;
		}
	}

	.loading {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	@keyframes spinner {
		from {
			width: 0;
			height: 0;
			opacity: 1;
			box-shadow: inset 0 0 0 0.25rem var(--text-color);
		}

		to {
			width: 100%;
			height: 100%;
			opacity: 0;
			box-shadow: inset 0 0 0 0.75rem var(--text-color);
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
			animation: spinner 1200ms cubic-bezier(0, 0.25, 0.75, 1) infinite forwards;
		}

		&::after {
			animation-delay: 600ms;
		}
	}
</style>
