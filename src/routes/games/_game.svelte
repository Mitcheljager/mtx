<script lang="ts">
	import Category from "../categories/_category.svelte"

  export let game = {
    title: null as string,
    categories: null as []
  }
  export let loading = false

	function sortCategories(categories) {
		return categories.sort((a, b) => (a.type > b.type) ? 1 : -1)
	}
</script>



<div class="card" class:card--loading={ loading }>
  { #if !loading }
    <div class="card__header">
      <div class="card__image"></div>
      <h3 class="card__title">{ game.title }</h3>
    </div>

		{ #each sortCategories(game.categories) as category }
			<Category { category } />
		{ /each }
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
		padding: 1.5rem;
		border-radius: 1rem;
		background: var(--content-bg);
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
				background: linear-gradient(to right, var(--content-bg) 10%, var(--body-bg), var(--content-bg) 90%);
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
    height: 7rem;
    margin-right: 1.5rem;
    background: var(--bg-dark);
		border: 1px solid var(--border-color);
  }

  .card__title {
    margin: 0;
    font-size: 1.2rem;
		color: var(--text-color-light);
  }
</style>
