<script lang="ts">
  import type { Game } from "$lib/types"
  import { tick } from "svelte"

  import { fade } from "svelte/transition"

  import { currentPage, games, getGames, getGamesbySearch, searchQuery } from "../stores/games"

  let debounce: any
  let loading = false
  let column = "title"
  let columnPlaceholder: HTMLElement
  let selectWidth = 0
  
  $: if (columnPlaceholder && column) setSelectWidth()
  $: value = $searchQuery

  function getData() {
    loading = true
    
    $games = []

    clearTimeout(debounce)

    try {
      debounce = setTimeout(async() => {
        $currentPage = 0
        $searchQuery = value

        let data: Game[]

        if (value) data = await getGamesbySearch(column, value)
        if (!value) data = await getGames()

        $games = data
        
        loading = false
      }, 500)
    } catch(error) {
      alert("Something went wrong!")
    }
  }

  async function setSelectWidth() {
    await tick()
    if (column && columnPlaceholder) selectWidth = columnPlaceholder.offsetWidth
  }
</script>



<div class="search">
  <input
    class="form-input form-input--large"
    type="text"
    placeholder="Search..."
    autocomplete="off"
    bind:value
    on:input={ getData } />

  { #if selectWidth > 0 }
    <div class="actions">
      by

      <select
        bind:value={ column }
        on:change={ () => { if (value) getData() } }
        style="width: calc({ selectWidth }px + .25rem)"
        aria-label="Search method">

        <option value="title">Title</option>
        <option value="publisher">Publisher</option>
      </select>
    </div>
  { /if }
</div>

<div class="column-placeholder" bind:this={ columnPlaceholder }>{ column }</div>

{ #if $searchQuery && !$games.length && !loading }
  <center in:fade={{ duration: 150 }}><em>No matches were found for your search query</em></center>
{ /if }

{ #if loading }
  <div class="loading" in:fade={{ duration: 500 }} aria-busy="true">
    <div class="spinner"></div>
  </div>
{ /if }



<style lang="scss">
  input {
    display: block;
    background: var(--content-bg);
    box-shadow: var(--shadow-big);
    
    &::placeholder {
      font-size: 1.5rem;
    }
  }

  select {
    -webkit-appearance: none;
    appearance: none;
    display: inline-block;
    min-width: 0;
    padding: .5rem 0;
    margin-left: .15rem;
    border: 0;
    background: var(--content-bg);
    font-size: 1rem;
    color: var(--text-color);
    font-family: var(--font-stack);
    cursor: pointer;

    &:hover,
    &:active,
    &:focus {
      text-decoration: underline;
      color: var(--text-color-light);
    }
  }

  .search {
    position: relative;
    max-width: clamp(300px, 100%, 50%);
    margin: clamp(3rem, 10vw, 5rem) auto;
  }

  .actions {
    position: absolute;
    display: flex;
    align-items: center;
    right: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-color-dark);
  }

  .column-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    height: 0;
    opacity: 0;
    overflow: hidden;
    text-transform: capitalize;
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
      box-shadow: inset 0 0 0 .25rem var(--text-color);
    }

    to {
      width: 100%;
      height: 100%;
      opacity: 0;
      box-shadow: inset 0 0 0 .75rem var(--text-color);
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
      animation: spinner 1200ms cubic-bezier(0, .25, .75, 1) infinite forwards;
    }

    &::after {
      animation-delay: 600ms;
    }
  }
</style>
