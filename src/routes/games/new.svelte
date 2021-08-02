<script>
  import supabase from "$lib/db"
  
  let newGame
  let submit = false
  
  async function sendData() {
    const { data, error } = await supabase
    .from("games")
    .insert([
      { "title": newGame }
    ])

    if (error) throw new Error(error.message)
    
    return data
  }
</script>



<form on:submit|preventDefault={() => submit = true}>
  <input type="text" bind:value={newGame}>
  <input type="submit" value="Submit" on:click={() => submit = false}>
</form>

{ #if submit }
  { #await sendData() }
    <p>Sending data...</p>
  { :then data }
    <p>Succesfully sent data.</p>
  { :catch error }
    <p>Something went wrong while sending the data:</p>
    <pre>{ error }</pre>
  { /await }
{ /if }
