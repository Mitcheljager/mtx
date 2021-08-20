<script lang="ts">
  import type { Game } from "$lib/types"

  import { loading, currentPage, games, getGames, getGamesbySearch, searchQuery } from "../../stores/games"

  let debounce: any
  let value = $searchQuery || ""

  function getData(event) {
    value = event.target.value
    $loading = true
    
    $games = []
    $searchQuery = value

    clearTimeout(debounce)

    try {
      debounce = setTimeout(async() => {
        $currentPage = 0

        let data: Game[]

        if (value) data = await getGamesbySearch(value)
        if (!value) data = await getGames()

        $games = data
        
        $loading = false
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
  { value }
  on:input={ getData } />



<style lang="scss">
  input {
    display: block;
    width: 100%;
    background: var(--content-bg);
    box-shadow: var(--shadow-big);
    
    &::placeholder {
      font-size: 1.5rem;
    }
  }
</style>
