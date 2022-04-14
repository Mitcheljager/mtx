<script lang="ts">
	import { page } from "$app/stores"
	import { currentPage, games, getGames, searchQuery } from "../../stores/games"

	import github from "./github.svg"

	async function refreshIfCurrentPage(event) {
		let href = event.target.href
		if (!href) href = event.target.closest("a").href

		if (href != window.location.toString().split("?")[0]) return

		$searchQuery = ""
		$currentPage = 0
		$games = await getGames()
	}
</script>



<header class="header">
	<a class="logo" href="/" sveltekit:prefetch on:click={ refreshIfCurrentPage } aria-label="Macrotransactions logo">
		<mark>M<span class="hidden sm:visible">acro</span></mark>t<span class="hidden sm:visible">ransactions</span>
	</a>

	<nav class="nav">
		<a class="nav__item" class:nav__item--active={ $page.path === "/" } sveltekit:prefetch href="/" on:click={ refreshIfCurrentPage }>Home</a>
		<a class="nav__item" class:nav__item--active={ $page.path === "/about" } sveltekit:prefetch href="/about">About</a>
	</nav>

	<div class="socials">
		<a href="https://github.com/Mitcheljager/mtx/" target="_blank" rel="noreferrer noopener">
			<img src={ github } alt="GitHub" width="24" height="24" />
		</a>
	</div>
</header>



<style lang="scss">
	.header {
		display: grid;
		grid-template: "logo nav socials";
		grid-template-columns: 50px calc(100% - 100px) 50px;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		padding: 1.5rem 0;
		margin-bottom: 1.5rem;

		@media (min-width: 640px) {
			grid-template-columns: 150px calc(100% - 300px) 150px;
		}
	}

	.nav {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0;
	}

	.nav__item {
		display: block;
		margin: 0 .75rem;
		color: var(--text-color);
		text-decoration: none;
		text-transform: lowercase;
		font-weight: bold;

		&:hover,
		&:focus,
		&:active {
			color: white;
			box-shadow: 0 2px 0 currentColor;
		}

		&--active {
			color: white;
		}
	}

	.logo {
		text-transform: lowercase;
		color: white;
		font-weight: bold;
		text-decoration: none;

		&:hover,
		&:focus,
		&:active {
			filter: brightness(1.2);
		}
	}

	.socials {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		height: 100%;

		img {
			height: 1.5rem;
			width: auto;
		}

		a {
			&:hover,
			&:active,
			&:focus {
				filter: brightness(2);
			}
		}
	}
</style>
