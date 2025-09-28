<script lang="ts">
	import { fade } from "svelte/transition";
	import { page } from "$app/stores";
	import { goto, afterNavigate, invalidate } from "$app/navigation";
	import { currentPage, games } from "$lib/stores/games";

	let debounce: ReturnType<typeof setTimeout> | null = null;
	let loading = $state(false);
	let value = $state($page.url.searchParams.get("search"));

	afterNavigate(() =>{
	  value = $page.url.searchParams.get("search");
	});

	function search(): void {
	  loading = true;

	  $games = [];
	  $currentPage = 1;

	  if (debounce) clearTimeout(debounce);

	  try {
	    debounce = setTimeout(async () => {
	      await navigate();
	      invalidate("games:index");

	      loading = false;
	    }, 500);
	  } catch {
	    alert("Something went wrong!");
	  }
	}

	async function navigate(): Promise<void> {
	  if (!value) {
	    $page.url.searchParams.delete("search");
	    await goto("/", { replaceState: true, keepFocus: true });

	    return;
	  }

	  $page.url.searchParams.set("search", value);
	  await goto(`?${$page.url.searchParams.toString()}`, { replaceState: true, keepFocus: true });
	}
</script>

<label for="search">Search</label>
<span id="search-hint">Search by game or publisher...</span>

<input
	class="search form-input form-input--large"
	type="search"
	id="search"
	placeholder="Search by game or publisher..."
	aria-describedby="search-hint"
	autocomplete="off"
	oninput={search}
	bind:value />

{#if !$games.length && !loading}
	<center in:fade={{ duration: 150 }}>
		<p>No results were found</p>
		<p class="color-dark"><em>Not able to find your game?</em> <a href="/requests/new">Submit a request</a></p>
	</center>
{/if}

{#if loading}
	<div class="loading" in:fade={{ duration: 500 }} aria-busy="true">
		<div class="spinner"></div>
	</div>
{/if}

<style lang="scss">
	label,
	span {
		position: absolute;
		left: -999px;
		height: 1px;
		width: 1px;
		overflow: hidden;
	}

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
