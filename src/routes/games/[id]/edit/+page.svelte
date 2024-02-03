<script>
	import { onMount } from "svelte"

	import Form from "$lib/components/Form.svelte"
	import { user } from "$lib/stores/session"

	export let data

	onMount(() => { if (!$user) goto("/login") })

	$: ({ game } = data)
</script>

<div class="wrapper">
	<h2>Edit game "{game.title}"</h2>

	<Form {game} />
</div>

<style lang="scss">
	h2 {
		text-align: center;
	}
</style>
