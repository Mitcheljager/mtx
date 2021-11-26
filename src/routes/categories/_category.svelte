<script lang="ts">
  import { slide } from "svelte/transition"
  import type { Category } from "$lib/types"

  export let category: Category

  let descriptionVisible = false

  function categoryTypeIcon(type) {
    if (type == "positive") return "👍"
    if (type == "negative") return "👎"
    if (type == "neutral") return "➖"
  }
</script>



<div class="category category--{ category.type }" on:click={ () => descriptionVisible = !descriptionVisible }>
  <div class="category__icon" aria-label="{ category.type } category">{ categoryTypeIcon(category.type) }</div>

  { category.title }

  { #if descriptionVisible }
    <div class="category__description" transition:slide={{ duration: 150 }}>
      ❔ <em>{ @html (category.description || "").replace(/\n/g, "<br>") }</em>
    </div>
  { /if }
</div>



<style lang="scss">
  .category {
    display: grid;
    grid-template:
      "icon title"
      "description description";
    grid-template-columns: 1.5rem auto;
    grid-gap: .25rem;
    margin-bottom: .25rem;
    padding: .35rem 0 .35rem .5rem;
    border-radius: .5rem;
    line-height: 1.5rem;
    color: hsla(0, 0%, 100%, .95);
    cursor: pointer;

    &:hover,
    &:active {
      filter: brightness(1.1);
    }

    &--neutral {
      background: linear-gradient(to right, var(--border-color), transparent);
    }

    &--positive {
      background: linear-gradient(to right, var(--green), transparent);
    }

    &--negative {
      background: linear-gradient(to right, var(--red), transparent);
    }
  }

  .category__icon {
    grid-area: icon;
    display: inline-block;
    width: 1.5rem;
    color: white;
  }

  .category__description {
    grid-area: description;
    padding: .5rem .75rem;
    border-radius: .5rem;
    background: rgba(0, 0, 0, .25);
    width: 100%;
    font-size: .85rem;
    line-height: 1.5em;

    em {
      color: rgba(255, 255, 255, 0.75);
    }
  }
</style>
