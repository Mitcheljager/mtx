<script lang="ts">
  import { onMount } from "svelte"
  import { goto } from "$app/navigation"
  
  import { createGame } from "$lib/db"
  import { user } from "../../stores/session"

  import ImageUpload from "./_imageUpload.svelte"
  
  let submit = false
  let title: string, publisher: string, year_of_release: any, image_url: string, slug: string

  onMount(() => { if (!$user) goto("/login") })
  
  async function submitForm() {
    let data: any

    try {
      data = await createGame({ title, publisher, year_of_release, image_url, slug })
    } catch(error) {
      throw new Error(error.message)
    }

    title = ""
    publisher = ""
    year_of_release = ""
    image_url = ""
    slug = ""

    return data
  }
</script>



<div class="wrapper">
  <h1>Add new game</h1>
    
  <form class="block" on:submit|preventDefault={ () => submit = true }>
    { #if !submit }
      <label class="form-label mt-0" for="title">Title</label>
      <input class="form-input" type="text" name="title" required bind:value={ title } on:change={ () => slug = title.replace(/[^a-z0-9]/gi, "-").toLowerCase() }>
      <p class="help">
        The name of the game. Full name, no abbreviations.
      </p>

      <label class="form-label" for="title">Slug</label>
      <input class="form-input" type="text" name="slug" required bind:value={ slug }>
      <p class="help">
        How the name will appear in the browser URL bar. Should be unique.
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

      <ImageUpload on:upload={ event => image_url = event.detail.image.Key } />

      <input class="button button--primary button--block button--large mt-1/2" type="submit" value="Submit">
    { :else }
      { #await submitForm() }
        <div class="alert">Sending data...</div>
      { :then data }
        <div class="alert alert--success">Success. Your request will be reviewed. <strong>Thank you!</strong></div>

        <a class="button mt-1/2" href="/games/categories/{ data[0].id }">Set categories</a>
      { :catch error }
        <div class="alert alert--error">Something went wrong while sending the data: <pre>{ error }</pre></div>
      { /await }
    { /if }
  </form>    
</div>



<style lang="scss">
  h1 {
    text-align: center;
  }
</style>
