<script>
	import { onMount } from "svelte"
	import { createGame, updateGame } from "$lib/db"

	import ImageUpload from "$lib/components/ImageUpload.svelte"

	export let game

	let submit = false
	let title
	let description
	let publisher
	let year_of_release
	let image_url
	let slug
	let tentative

	onMount(() => {
		if (game) setData()
	})

	function setData() {
		title = game.title
		description = game.description
		publisher = game.publisher
		year_of_release = game.year_of_release
		image_url = game.image_url
		slug = game.slug
		tentative = game.tentative
	}

	async function submitForm() {
		let data

		try {
			if (!game.id) {
				data = await createGame({
					title,
					description,
					publisher,
					year_of_release,
					image_url,
					slug,
					tentative
				})
			} else {
				data = await updateGame({
					id: game.id,
					title,
					description,
					publisher,
					year_of_release,
					image_url,
					slug,
					tentative
				})
			}
		} catch (error) {
			throw new Error(error.message)
		}

		title = ""
		publisher = ""
		year_of_release = ""
		image_url = ""
		slug = ""
		tentative = false

		return data
	}
</script>

<form class="block" on:submit|preventDefault={() => (submit = true)}>
	{#if !submit}
		<label class="form-label mt-0" for="title">Title</label>
		<input
			class="form-input"
			type="text"
			name="title"
			required
			bind:value={title}
			on:change={() => (slug = title.replace(/[^a-z0-9]/gi, "-").toLowerCase())}
		/>
		<p class="help">The name of the game. Full name, no abbreviations.</p>

		<label class="form-label" for="slug">Slug</label>
		<input class="form-input" type="text" name="slug" required bind:value={slug} />
		<p class="help">How the name will appear in the browser URL bar. Should be unique.</p>

		<label class="form-label" for="title">Tentative</label>
		<p class="help">Check if the game is not yet released and not all details are known.</p>
		<input class="form-checkbox" type="checkbox" name="tentative" bind:checked={tentative} />

		<label class="form-label" for="description">Description</label>
		<textarea class="form-input" type="text" name="description" rows="5" bind:value={description} />
		<p class="help">
			Short description of how microtransactions affect this game. Supports HTML, newlines are
			automatically inserted.
		</p>

		<label class="form-label" for="publisher">Publisher</label>
		<input
			class="form-input"
			type="text"
			name="publisher"
			placeholder="Optional"
			bind:value={publisher}
		/>
		<p class="help">The name of the publisher of the game.</p>

		<label class="form-label" for="year_of_release">Year of release</label>
		<input
			class="form-input"
			type="text"
			name="year_of_release"
			placeholder="Optional"
			bind:value={year_of_release}
		/>
		<p class="help">The year the game initially released.</p>

		<ImageUpload on:upload={(event) => (image_url = event.detail.image.fullPath)} />

		<input
			class="button button--primary button--block button--large mt-1/2"
			type="submit"
			value="Submit"
		/>
	{:else}
		{#await submitForm()}
			<div class="alert">Sending data...</div>
		{:then data}
			<div class="alert alert--success">
				Success. Your request will be reviewed. <strong>Thank you!</strong>
			</div>

			<a class="button mt-1/2" href="/games/{data[0].id}/categories">Set categories</a>
		{:catch error}
			<div class="alert alert--error">
				Something went wrong while sending the data: <pre>{error}</pre>
			</div>
		{/await}
	{/if}
</form>
