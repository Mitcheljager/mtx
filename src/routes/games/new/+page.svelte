<script>
	import Form from "$lib/components/Form.svelte";
</script>

<div class="wrapper">
	<h1>Add new game</h1>

	<Form game={{ title: "", description: "", slug: "", publisher: "", image_url: "", id: "", tentative: false, year_of_release: 0 }} />
</div>

<style lang="scss">
	h1 {
		text-align: center;
	}
</style>
