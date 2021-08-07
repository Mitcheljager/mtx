<script lang="ts">
	import { user } from "../stores/session"
	import supabase from "$lib/db"

	import Header from "$lib/header/Header.svelte"
	import Footer from "$lib/footer/Footer.svelte"

	import "../app.scss"

	$user = supabase.auth.user()

	supabase.auth.onAuthStateChange((_, session) => {
		$user = session.user
	})
</script>



<Header />

<main>
	<slot />
</main>

<Footer />



<style lang="scss">
	main {
		max-width: var(--max-width);
		margin: 0 auto;
	}
</style>
