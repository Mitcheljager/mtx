<script lang="ts">
  export let category = {
    title: null as string,
    type: null as string
  }
</script>



<div class="category category--{ category.type }">
  { category.title }
</div>



<style lang="scss">
  .category {
    padding: .25rem .5rem;
    color: white;
    
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
</style>
