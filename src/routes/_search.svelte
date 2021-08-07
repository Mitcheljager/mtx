<script lang="ts">
  import type { Game } from "$lib/db"

  import { fade } from "svelte/transition"

  import { games, getGames, getGamesbySearch } from "../stores/games"

  let debounce: any
  let value = ""
  let noResults = false
  let loading = false

  function getData(event) {
    value = event.target.value
    loading = true
    noResults = false
    
    $games = []

    clearTimeout(debounce)

    try {
      debounce = setTimeout(async() => {
        let data: Game[]

        if (value) data = await getGamesbySearch(value)
        if (!value) data = await getGames()

        $games = data
        
        noResults = !data.length
        loading = false
      }, 500)
    } catch(error) {
      alert("Something went wrong!")
    }
  }
</script>



<input
  class="form-input form-input--large"
  type="text"
  placeholder="Search..."
  autocomplete="off"
  on:input={ getData } />

{ #if noResults }
  <center in:fade={{ duration: 150 }}><em>No matches were found for your search query</em></center>
{ /if }

{ #if loading }
  <div class="loading" in:fade={{ duration: 500 }}>
    <div class="spinner"></div>
  </div>
{ /if }



<style lang="scss">
  input {
    display: block;
    max-width: clamp(300px, 100%, 50%);
    margin: clamp(3rem, 10vw, 6rem) auto;
    background: var(--content-bg);
    box-shadow: var(--shadow-big);
    
    &::placeholder {
      font-size: 1.5rem;
    }
  }

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @keyframes spinner {
    from {
      width: 0;
      height: 0;
      opacity: 1;
      box-shadow: inset 0 0 0 .25rem white;
    }

    to {
      width: 100%;
      height: 100%;
      opacity: 0;
      box-shadow: inset 0 0 0 .75rem white;
    }
  }

  .spinner {
    position: relative;
    width: 10rem;
    height: 10rem;

    &::before,
    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      width: 0;
      height: 0;
      border-radius: 50%;
      animation: spinner 1200ms cubic-bezier(0, .25, 0.75, 1) infinite forwards;
    }

    &::after {
      animation-delay: 600ms;
    }
  }
</style>
