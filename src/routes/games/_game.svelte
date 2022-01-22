<script lang="ts">
	import { SupabaseLazyImage } from "svelte-supabase-lazy-images/src"

	import supabase from "$lib/db"
	import type { Game } from "$lib/types"
	import { searchQuery } from "../../stores/games"

	import Category from "../categories/_category.svelte"
	import Background from "./_background.svelte"
	import Grade from "./_grade.svelte"

  export let game: Game

	const maxCategories = 10

	function setSearchQuery() {
		$searchQuery = game.publisher

		window.scrollTo(0, 0)
	}
</script>



<div class="card">
	<div class="card__content">
		<div class="card__header">
			<a class="card__image" href="/{ game.slug }" tabindex="-1" sveltekit:prefetch>
				{ #if game.image_url }
					<SupabaseLazyImage { supabase }
						from="games"
						key={ game.image_url.split("games/")[1] }
						width={ 80 }
						height={ 106 }
						alt={ game.title } />
				{ /if }
			</a>

			<div>
				<div><a class="card__title" href="/{ game.slug }" sveltekit:prefetch>{ game.title }</a></div>

				{ #if game.publisher }
					<a href="/?search={ game.publisher }" on:click={ setSearchQuery } class="card__name">{ game.publisher }</a>
				{ /if }

				{ #if game.year_of_release }
					<div class="card__date">{ game.year_of_release }</div>
				{ /if }

				<div class="card__grade">
					<Grade categories={ game.categories } />
				</div>
			</div>
		</div>

		{ #each game.categories.filter((c, i) => i < maxCategories) as category }
			<Category { category } />
		{ /each }

		{ #if game.categories.length > maxCategories }
			<a class="card__more" href="/{ game.slug }" sveltekit:prefetch tabindex="-1">
				and { game.categories.length - maxCategories } more...
			</a>
		{ /if }
	</div>

	{ #if game.image_url }
		<Background key={ game.image_url.split("games/")[1] } />
	{ /if }
</div>



<style lang="scss">
  .card {
		position: relative;
		display: block;
		height: 100%;
		padding: 1.5rem;
		border-radius: 1rem;
		background: var(--bg-dark);
		box-shadow: var(--shadow-medium);
		overflow: hidden;
	}

	.card__content {
		position: relative;
		z-index: 1;
	}

	.card__header {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		margin-bottom: 1.5rem;
	}

  .card__image {
		flex: 0 0 80px;
    width: 80px;
    aspect-ratio: 1 / 1.333;
    margin-right: 1.5rem;
		border-radius: .5rem;
    background: var(--content-bg);
		overflow: hidden;

		&:hover,
		&:active,
		&:focus {
			filter: brightness(1.1);
		}
  }

  .card__title {
    margin: 0;
		width: 100%;
		color: var(--text-color-title);
    font-size: 1.2rem;
		font-weight: bold;
		text-decoration: none;

		&:hover,
		&:focus,
		&:active {
			color: var(--text-color-title);
			box-shadow: 0 2px 0 currentColor;
		}
  }

	.card__date {
		color: var(--text-color-dark);
	}

	.card__name {
		color: var(--text-color-medium);
		text-decoration: none;

		&:hover,
		&:active,
		&:focus-visible {
			color: var(--text-color);
		}
	}

	.card__grade {
		margin-top: .5rem;
	}

	.card__more {
		display: inline-block;
		margin-top: .5rem;
		color: var(--text-color-medium);
		text-decoration: none;

		&:hover,
		&:active,
		&:focus {
			color: var(--text-color);
		}
	}
</style>
