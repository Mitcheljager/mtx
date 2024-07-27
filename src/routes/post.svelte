<script>
  /** @type {{title?: string, description?: string, children?: import('svelte').Snippet}} */
  const { title = "", description = "", children } = $props();
</script>

<svelte:head>
  <title>Macrotransactions | {title}</title>
  <meta name="description" content={description} />
</svelte:head>

<article class="wrapper">
  <h1>{title}</h1>

  {@render children?.()}
</article>

<style lang="scss">
  article :global(p) {
    line-height: 1.5em;
  }
</style>
