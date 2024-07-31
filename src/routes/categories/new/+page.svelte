<script lang="ts">
  import { createCategory } from "$lib/db"

  let submit = $state(false)
  let title = $state("")
  let type = $state("")

  async function submitForm() {
    let data

    try {
      data = await createCategory({ title, type })
    } catch(error: any) {
      throw new Error(error?.message)
    }

    return data
  }
</script>

<div class="wrapper">
  <h1>Add new category</h1>

  <form class="block" onsubmit={(event) => {
    event.preventDefault();
    submit = true
  }}>
    {#if !submit}
      <label class="form-label mt-0" for="title">Title</label>
      <input class="form-input" type="text" name="title" required bind:value={title}>
      <p class="help">
        The title of the category as it will be displayed everywhere
      </p>

      <label class="form-label" for="title">Type</label>
      <select class="form-input" required bind:value={type}>
        <option value="neutral">Neutral</option>
        <option value="positive">Positive</option>
        <option value="negative">Negative</option>
      </select>

      <input class="button button--primary button--block button--large mt-1/2" type="submit" value="Submit">
    {:else}
      {#await submitForm()}
        <div class="alert">Sending data...</div>
      {:then}
        <div class="alert alert--success">Success. Your request will be reviewed. <strong>Thank you!</strong></div>
      {:catch error}
        <div class="alert alert--error">Something went wrong while sending the data: <pre>{error}</pre></div>
      {/await}
    {/if}
  </form>
</div>

<style lang="scss">
  h1 {
    text-align: center;
  }
</style>
