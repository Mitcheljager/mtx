<script>
	import { page } from "$app/stores"
</script>

<svelte:head>
	<title>Macrotransactions | {$page.status}</title>
</svelte:head>

<h1>{$page.status}</h1>

<p>{$page.error?.message}</p>

<style>
	h1,
	p {
		text-align: center;
	}
</style>
