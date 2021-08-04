<script lang="ts">
  import { createGame } from "$lib/db"
  
  let submit = false
  let title, publisher, year_of_release
  
  async function submitForm() {
    let data

    try {
      data = await createGame({ title, publisher, year_of_release })
    } catch(error) {
      throw new Error(error.message)
    }

    title = ""
    publisher = ""
    year_of_release = ""
    
    return data
  }
</script>



<div class="wrapper">
  <h1>Add new game</h1>
    
  <form on:submit|preventDefault={ () => submit = true }>
    { #if !submit }
      <label class="form-label mt-0" for="title">Title</label>
      <input class="form-input" type="text" name="title" required bind:value={ title }>
      <p class="help">
        The name of the game. Full name, no abbreviations.
      </p>

      <label class="form-label" for="publisher">Publisher</label>
      <input class="form-input" type="text" name="publisher" placeholder="Optional" bind:value={ publisher }>
      <p class="help">
        The name of the publisher of the game.
      </p>

      <label class="form-label" for="year_of_release">Year of release</label>
      <input class="form-input" type="text" name="year_of_release" placeholder="Optional" bind:value={ year_of_release }>
      <p class="help">
        The year the game initially released.
      </p>

      <input class="button button--primary button--block button--large mt-1/2" type="submit" value="Submit">
    { :else }
      { #await submitForm() }
        <div class="alert">Sending data...</div>
      { :then data }
        <div class="alert alert--success">Success. Your request will be reviewed. <strong>Thank you!</strong></div>
      { :catch error }
        <div class="alert alert--error">Something went wrong while sending the data: <pre>{ error }</pre></div>
      { /await }
    { /if }
  </form>    
</div>



<style lang="scss">
  .wrapper {
    max-width: 480px;
    margin: 0 auto;
  }

  h1 {
    text-align: center;
  }

  form {
    padding: 1.5rem;
    border-radius: 1rem;
    background: var(--content-bg);
    box-shadow: var(--shadow-big);
  }
</style>
