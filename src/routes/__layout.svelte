<script lang="ts">
	import { navigating } from "$app/stores"
	import { user } from "../stores/session"
	import supabase from "$lib/db"

  import { getNavigationStore } from "$lib/viewTransition"
	import Header from "$lib/header/Header.svelte"
	import Footer from "$lib/footer/Footer.svelte"

	import "../app.scss"

	let awaitingNavigating = false

	$: if ($navigating) awaitingNavigating = true
	$: if (awaitingNavigating) {
		if (document?.startViewTransition) {
			const navigation = getNavigationStore()
			const navigationComplete = navigation.complete()

			document.startViewTransition(async() => {
				await navigationComplete
				awaitingNavigating = false
			})
		}
	}

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
		width: 100%;
		max-width: var(--max-width);
		margin: 0 auto;
	}
</style>
