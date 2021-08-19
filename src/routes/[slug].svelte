<script context="module" lang="ts">
  import { getGame } from "../stores/games"

	export const prerender = true

  export async function load({ page }) {
    let data: Game

    try {
      data = await getGame("slug", page.params.slug)
    } catch(error) {
      if (!data) return { status: 404, error: "Not found" }
    }

    return {
      props: { game: data }
    }
	}
</script>

<script lang="ts">
  import { user } from "../stores/session"
  import type { Game } from "$lib/types"

  import Category from "./categories/_category.svelte"
  import Thumbnail from "./games/_thumbnail.svelte"
  import Grade from "./games/_grade.svelte"
  import Background from "./games/_background.svelte"

  export let game: Game

  function sortCategories() {
		return game.categories.sort((a, b) => (a.type > b.type) ? 1 : -1)
	}
</script>



<svelte:head>
	<title>Macrotransactions | { game.title }</title>
</svelte:head>



<div class="wrapper">
  <h1>{ game.title }</h1>

  <div class="block">
    <aside class="sidebar sm:mr-1/2">
      <div class="image mb-1/4">
        { #if game.image_url }
          <Thumbnail { game } />
        { /if }
      </div>

      <div class="grade mb-1/4">
        <Grade categories={ game.categories } size="large" />
      </div>

      <div class="info">
        { #if game.publisher }
          <div class="name sm:mt-1/8">{ game.publisher }</div>
        { /if }

        { #if game.year_of_release }
          <div class="date mt-1/8">{ game.year_of_release }</div>
        { /if }

        { #if $user }
          <div class="mt-1/2">
            <small><a href="/games/categories/{ game.id }">Edit categories</a></small> <br>
            <small><a href="/games/edit-{ game.id }">Edit game</a></small>
          </div>
        { /if }
      </div>
    </aside>

    <div>
      { #if game.description }
        <div class="description">
          { @html game.description.replace(/\n/g, "<br>") }
        </div>
      { /if }

      { #if game.categories }
        <div class="categories">
          { #each sortCategories() as category (category.id) }        
            <Category { category } />
          { /each }
        </div>
      { /if }
    </div>

    { #if game.image_url }
      <Background key={ game.id } />
    { /if }
  </div>
</div>



<style lang="scss">
  $breakpoint: 640px;

  h1 {
    background: linear-gradient(130deg, var(--primary), var(--secondary));
		background-clip: text;
		-webkit-background-clip: text;
		color: transparent;
    text-align: center;
  }

  @keyframes loading {
    from { transform: translateX(-100%) }
    to { transform: translateX(100%) }
  }

  .image {
    grid-area: image;
    width: 6rem;
    aspect-ratio: 1 / 1.333;
		border-radius: .5rem;
    background: var(--content-bg);
		box-shadow: inset 0 0 0 1px var(--border-color);
		overflow: hidden;

    @media (min-width: $breakpoint) {
      width: 7.5rem;
    }
  }

  .categories {
    position: relative;
    width: 100%;
    z-index: 1;
  }

  .date {
		color: var(--text-color-dark);
	}

	.name {
		color: var(--text-color-medium);
	}

  .wrapper {
    max-width: 640px;
  }

  .sidebar {
    position: relative;
    display: grid;
    grid-template: "image info" "grade grade";
    grid-template-columns: 6rem auto;
    grid-gap: 0 .75rem;
    z-index: 1;

    @media (min-width: $breakpoint) {
      display: block;
    }
  }

  .grade {
    grid-area: grade;
  }

  .info {
    grid-area: info
  }

  .block {
    position: relative;

    @media (min-width: $breakpoint) {
      display: flex;
      align-items: flex-start;
    }
  }

  .description {
    position: relative;
    margin-bottom: 1.5rem;
    line-height: 1.5em;
    z-index: 1;
  }
</style>
