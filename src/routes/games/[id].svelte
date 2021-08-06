<script lang="ts">
  import { page } from "$app/stores"
  
  import { user } from "../../stores/session"
  import supabase from "$lib/db"
  import type { Game } from "$lib/db"

  import Category from "../categories/_category.svelte"
  import Thumbnail from "./_thumbnail.svelte"
  import Grade from "./_grade.svelte"

  let game: Game

  const { id } = $page.params

  async function getGame() {
		const { data, error } = await supabase
		.from("games")
		.select(`
			id, title, publisher, year_of_release, image_url,
			categories (id, title, type)
		`)
    .eq("id", id)
			
		if (error) throw new Error(error.message)

    game = data[0]
	}

  function sortCategories() {
		return game.categories.sort((a, b) => (a.type > b.type) ? 1 : -1)
	}
</script>



{ #await getGame() }
  <div class="wrapper">
    <h1>&nbsp;</h1>

    <div class="block block--loading"></div>
  </div>
{ :then data }
  <div class="wrapper">
    <h1>{ game.title }</h1>
  
    <div class="block">
      <div class="mr-1/2">
        <div class="image mb-1/4">
          { #if game.image_url }
            <Thumbnail { game } />
          { /if }
        </div>

        <div class="mb-1/4">
					<Grade categories={ game.categories } size="large" />
				</div>

        { #if game.year_of_release }
          <div class="date mt-1/8">{ game.year_of_release }</div>
        { /if }

        { #if game.publisher }
          <div class="name mt-1/8">{ game.publisher }</div>
        { /if }

        { #if $user }
          <div class="mt-1/2">
            <small><a href="/games/categories/{ game.id }">Edit categories</a></small>
          </div>
        { /if }
      </div>

      { #if game.categories }
        <div class="categories">
          { #each sortCategories() as category (category.id) }        
            <Category { category } />
          { /each }
        </div>
      { /if }
    </div>
  </div>
{ :catch error }
  <p>Something went wrong while loading this page:</p>
  <pre>{ error }</pre>
{ /await }



<style lang="scss">
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
    width: 7.5rem;
    aspect-ratio: 1 / 1.333;
		border-radius: .5rem;
    background: var(--content-bg);
		box-shadow: inset 0 0 0 1px var(--border-color);
		overflow: hidden;
  }

  .categories {
    width: 100%;
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

  .block {
    display: flex;
    align-items: flex-start;
    
    &--loading {
			position: relative;
      background: var(--bg-dark);
			overflow: hidden;
			aspect-ratio: 1 / 1;

			&::after {
				content: "";
				position: absolute;
				top: 0;
        left: 0;
				height: 100%;
				width: 100%;
				background: linear-gradient(to right, var(--bg-dark) 10%, var(--content-bg), var(--bg-dark) 90%);
				background-repeat: no-repeat;
				animation: loading 1000ms infinite;
			}
		}
  }
</style>
