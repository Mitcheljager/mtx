<script context="module" lang="ts">
  import supabase from "$lib/db"

	export const prerender = true

  export async function load() {
    let categories: any[]

    try {
      const { data, error } = await supabase
      .from("categories")
      .select("id, title, type, description")
      .order("type")

      if (error) throw new Error(error.toString())

      categories = data
    } catch(error) {
      if (!categories) return { status: 404, error: "Not found" }
    }

    return {
      props: { categories }
    }
	}
</script>

<script lang="ts">
  import { flip } from "svelte/animate"

  import Category from "./categories/_category.svelte"

  export let categories
</script>



<h1>Categories</h1>

<div class="wrapper">
  <div class="block mb-1/4">
    { #each categories as category (category.id) }
      <div class="item" animate:flip={{ duration: 200 }}>
        <Category { category } />
      </div>
    { /each }
  </div>
</div>



<style lang="scss">
  h1 {
    text-align: center;
  }
</style>
