<script lang="ts">
  import Category from "$lib/components/Category.svelte";

  const { data } = $props();

  const { categories } = $derived(data);
</script>

<svelte:head>
	<title>All categories | Macrotransactions.org</title>
</svelte:head>

<article class="wrapper">
  <h1>All categories</h1>

  {#each categories as category (category.title)}
    <a href="/categories/{category.id}"><Category {category} /></a>
  {/each}
</article>

<style lang="scss">
  a {
    text-decoration: none;

    &:hover {
      filter: brightness(1.2);
    }
  }
</style>
