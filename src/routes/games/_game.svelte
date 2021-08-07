<script lang="ts">
	import type { Game } from "$lib/db"

	import Category from "../categories/_category.svelte"
	import Thumbnail from "./_thumbnail.svelte"
	import Grade from "./_grade.svelte"

  export let game: Game
  export let loading = false
	
	const maxCategories = 10

	function sortCategories() {
		return game.categories.sort((a, b) => (a.type > b.type) ? 1 : -1).filter((c, i) => i < maxCategories)
	}
</script>



<div class="card" class:card--loading={ loading }>
  { #if !loading }
    <div class="card__header">
      <div class="card__image">
				{ #if game.image_url }
					<a href="/{ game.slug }" tabindex="-1" sveltekit:prefetch>
						<Thumbnail { game } width={ 80 } height={ 106 } />
					</a>
				{ /if }
			</div>

			<div>
				<div><a class="card__title" href="/{ game.slug }" sveltekit:prefetch>{ game.title }</a></div>

				{ #if game.year_of_release }
					<div class="card__date">{ game.year_of_release }</div>
				{ /if }

				{ #if game.publisher }
					<div class="card__name">{ game.publisher }</div>
				{ /if }

				<div class="card__grade">
					<Grade categories={ game.categories } />
				</div>
			</div>
    </div>

		{ #each sortCategories() as category }
			<Category { category } />
		{ /each }

		{ #if game.categories.length > maxCategories }
			<a class="card__more" href="/{ game.slug }" sveltekit:prefetch tabindex="-1">
				and { game.categories.length - maxCategories } more...
			</a>
		{ /if }
  { /if }
</div>



<style lang="scss">
  @keyframes loading {
    from { transform: translateX(-100%) }
    to { transform: translateX(100%) }
  }

  .card {
		position: relative;
		display: block;
		height: 100%;
		padding: 1.5rem;
		border-radius: 1rem;
		background: var(--bg-dark);
		box-shadow: var(--shadow-medium);

		&--loading {
			position: relative;
			overflow: hidden;
			aspect-ratio: 2 / 3;

			&::after {
				content: "";
				position: absolute;
				top: 0;
				height: 100%;
				width: 100%;
				background: linear-gradient(to right, var(--bg-dark) 10%, var(--content-bg), var(--bg-dark) 90%);
				background-repeat: no-repeat;
				animation: loading 1000ms infinite;
			}
		}
	}

	.card__header {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		margin-bottom: 1.5rem;
	}

  .card__image {
    width: 5rem;
    aspect-ratio: 1 / 1.333;
    margin-right: 1.5rem;
		border-radius: .5rem;
    background: var(--content-bg);
		box-shadow: inset 0 0 0 1px var(--border-color);
		overflow: hidden;

		a {
			&:hover,
			&:active,
			&:focus {
				filter: brightness(1.1);
			}
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
			box-shadow: 0 3px 0 currentColor;
		}
  }

	.card__date {
		color: var(--text-color-dark);
	}

	.card__name {
		color: var(--text-color-medium);
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
