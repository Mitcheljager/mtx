<script lang="ts">
	import Header from "$lib/header/Header.svelte"
	import "../app.scss"
</script>



<Header />

<main>
	<slot />
</main>

<footer>
	
</footer>



<style lang="scss">
	main {
		max-width: 1400px;
		margin: 0 auto;
	}
</style>
