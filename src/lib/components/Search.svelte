<script>
	import { fade } from "svelte/transition"
	import { page } from "$app/stores"
	import { goto, afterNavigate, invalidate } from "$app/navigation"

	import { currentPage, games } from "$lib/stores/games"

	let debounce = null
	let loading = false
	let value = $page.url.searchParams.get("search")

	afterNavigate(() =>{
		value = $page.url.searchParams.get("search")
	})

	function search() {
		loading = true

		$games = []
		$currentPage = 1

		clearTimeout(debounce)

		try {
			debounce = setTimeout(async () => {
				await navigate()
				invalidate("games")

				loading = false
			}, 500)
		} catch (error) {
			alert("Something went wrong!")
		}
	}

	async function navigate() {
		if (!value) {
			$page.url.searchParams.delete("search")
			await goto(`/`, { replaceState: true, keepFocus: true })

			return
		}

		$page.url.searchParams.set("search", value)
		await goto(`?${$page.url.searchParams.toString()}`, { replaceState: true, keepFocus: true })
	}
</script>

<input
	class="search form-input form-input--large"
	type="text"
	placeholder="Search..."
	autocomplete="off"
	on:input={search}
	bind:value />

{#if !$games.length && !loading}
	<center in:fade={{ duration: 150 }}><em>No results were found</em></center>
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
