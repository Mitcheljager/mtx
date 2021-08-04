<script lang="ts">
  import supabase from "$lib/db"

  import { games } from "../stores/games"

  let debounce: any
  let value: string = ""
  let noResults: boolean = false
  
  $: if (value) getSearchData()

  async function getSearchData() {
    clearTimeout(debounce)
    
    debounce = setTimeout(async () => { 
      const { data, error } = await supabase
      .from("games")
      .select(`
        id, title, publisher, year_of_release,
        categories (id, title, type)
      `)
      .textSearch("title", value, {
        type: "websearch",
        config: "english"
      })
      .limit(20)
        
      if (error) throw new Error(error.message)
      if (!data.length) noResults = true

      $games = data
    }, 500)
	}
</script>



<input
  class="form-input form-input--large mb-1/1"
  type="text"
  placeholder="Search..."
  autocomplete="off"
  bind:value />

{ #if noResults }
  <div>No matches were found for your search query</div>
{ /if }



<style lang="scss">
  input {
    background: var(--content-bg);
    max-width: 480px;
    
    &::placeholder {
      font-size: 1.5rem;
    }
  }
</style>
