<script lang="ts">
  import { onMount } from "svelte"
  import { flip } from "svelte/animate"
  import { page } from "$app/stores"
  import { goto } from "$app/navigation"
  
  import { user } from "../../../stores/session"
  import supabase, { createGameCategory, destroyGameCategory } from "$lib/db"
  import Category from "../../categories/_category.svelte"

  const { id } = $page.params

  let categories = []
  let allCategories = []
  $: availableCategories = allCategories.filter(c => !categories.some(i => i.id == c.id))

  onMount(() => { if (!$user) goto("/login") })

  async function getCategories() {
		const { data, error } = await supabase
		.from("game_category")
		.select(`
      game_id, category_id,
			categories (id, title, type)
    `)
    .eq("game_id", id)
			
		if (error) throw new Error(error.message)

		categories = data.map(d => d.categories)
	}
  
  async function getAllCategories() {
		const { data, error } = await supabase
		.from("categories")
		.select("id, title, type")
		.order("type")
			
		if (error) throw new Error(error.message)

		allCategories = data
	}

  async function addCategory(category) {
    try {
      categories = [...categories, category]
      await createGameCategory(category.id, id)
    } catch(error) {
      alert(error.message)
    }
  }

  async function removeCategory(category) {
    try {
      categories = categories.filter(c => c.id != category.id)
      await destroyGameCategory(category.id, id)
    } catch(error) {
      alert(error.message)
    }
  }
</script>



<h1>Add categories</h1>

<div class="wrapper">
  <div class="block mb-1/4">
    <h3 class="mt-0">Current categories</h3>

    { #await getCategories() }
      Loading categories...
    { :then data }
      { #each categories as category (category.id) }        
        <div class="item" animate:flip={{ duration: 200 }}>
          <div class="add button" on:click={ () => removeCategory(category) }>
            -
          </div>

          <div>
            <Category { category } />
          </div>
        </div>
      { /each }

      { #if categories.length == 0 }
        <em>You've not yet added any categories. Select categories from below to add them to this game.</em>
      { /if }
    { :catch error }
      <p>Something went wrong while fetching the data:</p>
      <pre>{ error }</pre>
    { /await }
  </div>
    
  <div class="block mb-1/4">
    <h3 class="mt-0">Available categories</h3>

    { #await getAllCategories() }
      Loading categories...
    { :then data }
      { #each availableCategories as category (category.id) }
        <div class="item" animate:flip={{ duration: 200 }}>
          <div class="add button" on:click={ () => addCategory(category) }>
            +
          </div>

          <div>
            <Category { category } />
          </div>
        </div>
      { /each }
    { :catch error }
      <p>Something went wrong while fetching the data:</p>
      <pre>{ error }</pre>
    { /await }
  </div>
</div>



<style lang="scss">
  h1 {
    text-align: center;
  }

  .item {
    display: flex;
  }

  .add {
    align-items: center;
    margin: 0 .5rem .25rem 0;
    font-size: 1.2rem;
    border-radius: .5rem;
  }

  .wrapper {
    max-width: 900px;

    @media (min-width: 900px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 1.5rem;
    }
  }
</style>
