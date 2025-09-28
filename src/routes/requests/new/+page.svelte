<script lang="ts">
  let title = $state("");
  let description = $state("");
  let errorMessage = $state("");
  let submitting = $state(false);
  let success = $state(false);

  async function submit(event: SubmitEvent): Promise<void> {
    event.preventDefault();

    if (submitting) return;

    submitting = true;

    try {
      if (title.length > 100) throw new Error("Title can be a maximum of 100 characters");
      if (description.length > 500) throw new Error("Description can be a maximum of 500 characters");

      const response = await fetch("/api/requests/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description })
      });

      const text = await response.text();

      if (!response.ok) throw new Error(text);

      success = true;
    } catch (error: any) {
      errorMessage = error.message;
    } finally {
      submitting = false;
    }
  }

  function reset(): void {
    title = "";
    description = "";
    errorMessage = "";
    submitting = false;
    success = false;
  }
</script>

<svelte:head>
  <title>Submit a request | Macrotransactions.org</title>
</svelte:head>

<div class="wrapper">
  <h1>Request a game</h1>

  <div class="block">
    {#if success}
      <div class="alert alert--success mt-0">
        Your request was succesfully received. Thank you!
      </div>

      <button class="button mt-1/2" onclick={reset}>Submit another request</button>
    {:else}
      <form onsubmit={submit}>
        <p class="mt-0">Not able to find a game you would like to see listed? Let us know! Games can be listed for any reason; it could be especially egregious, or the complete opposit. <em>Please keep in mind that only games that are available on PC are eligible.</em></p>

        <label class="form-label" for="title">What is the name of the game?</label>
        <input bind:value={title} class="form-input" type="text" maxlength="100" name="title" id="title" />
        <p class="help">{100 - title.length} characters remaining</p>

        <label class="form-label" for="title">Why would you like this game to be listed? (Optional)</label>
        <textarea bind:value={description} class="form-input" maxlength="500" rows="10"></textarea>
        <p class="help">{500 - description.length} characters remaining</p>

        {#if errorMessage && !submitting}
          <div class="alert alert--error mt-1/2">
            An error occured while submitting your request: <em>{errorMessage}</em>
          </div>
        {/if}

        {#if submitting}
          <button class="button mt-1/2" disabled>Submitting...</button>
        {:else}
          <button type="submit" class="button button--primary mt-1/2">Submit your request</button>
        {/if}
      </form>
    {/if}
  </div>
</div>

<style lang="scss">
	h1 {
		text-align: center;
	}
</style>
