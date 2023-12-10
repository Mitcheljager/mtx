<script>
	import Form from "$lib/components/Form.svelte"

	export let data

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
