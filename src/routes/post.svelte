<script>
  export let title = ""
  export let description = ""
</script>

<svelte:head>
  <title>Macrotransactions | {title}</title>
  <meta name="description" content={description} />
</svelte:head>

<article class="wrapper">
  <h1>{title}</h1>

  <slot />
</article>

<style lang="scss">
  article :global(p) {
    line-height: 1.5em;
  }
</style>
