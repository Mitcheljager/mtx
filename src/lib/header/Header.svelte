<script lang="ts">
	import { page } from "$app/stores"

	import github from "./github.svg"
</script>



<header class="header">
	<a class="logo" href="/" sveltekit:prefetch>
		<mark>Macro</mark>transactions
	</a>

	<nav class="nav">
		<a class="nav__item" class:nav__item--active={ $page.path === "/" } sveltekit:prefetch href="/">Home</a>
		<a class="nav__item" class:nav__item--active={ $page.path === "/about" } sveltekit:prefetch href="/about">About</a>
	</nav>

	<div class="socials">
		<a href="https://github.com/Mitcheljager/mtx/" target="_blank" rel="noreferrer noopener">
			<img src={ github } alt="GitHub" />
		</a>
	</div>
</header>



<style lang="scss">
	.header {
		display: grid;
		grid-template: "logo nav socials";
		grid-template-columns: 150px calc(100% - 300px) 150px;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		padding: 1.5rem 0;
		margin-bottom: 1.5rem;
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
		text-align: center;
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
