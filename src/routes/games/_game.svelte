<script lang="ts">
	import type { Game } from "$lib/db"

	import Category from "../categories/_category.svelte"

  export let game: Game
  export let loading = false

	let maxCategories = 10

	$: grade = categoriesToScore()

	function sortCategories() {
		return game.categories.sort((a, b) => (a.type > b.type) ? 1 : -1).filter((c, i) => i < maxCategories)
	}

	function categoriesToScore() {
		let score:number = 10

		const negativeCategories = game?.categories?.filter(c => c.type == "negative").length

		score -= (negativeCategories / 2)

		if (score == 10) return "A"
		if (score > 8) return "B"
		if (score > 6) return "C"
		if (score > 4) return "D"
		if (score > 2) return "E"
		return "F"
	}
</script>



<div class="card" class:card--loading={ loading }>
  { #if !loading }
    <div class="card__header">
      <div class="card__image"></div>

			<div>
				<h3 class="card__title">{ game.title }</h3>

				{ #if game.year_of_release }
					<div class="card__date">{ game.year_of_release }</div>
				{ /if }

				{ #if game.publisher }
					<div class="card__name">{ game.publisher }</div>
				{ /if }

				<div>
					<small><a href="/games/categories/{ game.id }">Edit categories</a></small>
				</div>

				<div class="card__grade card__grade--{ grade }">
					{ grade }
				</div>
			</div>
    </div>

		{ #each sortCategories() as category }
			<Category { category } />
		{ /each }

		{ #if game.categories.length > maxCategories }
			And { game.categories.length - maxCategories } more...
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
    background: var(--content-bg);
		box-shadow: inset 0 0 0 1px var(--border-color);
  }

  .card__title {
    margin: 0;
		width: 100%;
		color: var(--text-color-title);
    font-size: 1.2rem;
  }

	.card__date {
		color: var(--text-color-dark);
	}

	.card__name {
		color: var(--text-color-medium);
	}

	.card__grade {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: .15rem 0 .25rem;
		margin-top: .5rem;
		width: 2rem;
		height: 2rem;
		border-radius: 99px;
		background: var(--border-color);
		color: white;
		font-size: 1.2rem;
		line-height: 1em;
		font-weight: bold;
		text-shadow: 0 3px 1px hsla(0, 0%, 0%, .25);

		$grades: (
			A: var(--green),
			B: var(--blue),
			C: var(--border-color),
			D: var(--yellow),
			E: var(--orange),
			F: var(--red)
		);

		@each $grade, $color in $grades {
			&--#{ $grade } {
				background: $color;
			}
		}
	}
</style>
