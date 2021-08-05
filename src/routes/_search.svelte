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
        id, title, publisher, year_of_release, image_url,
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
  class="form-input form-input--large"
  type="text"
  placeholder="Search..."
  autocomplete="off"
  bind:value />

{ #if noResults }
  <center><em>No matches were found for your search query</em></center>
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
</style>
