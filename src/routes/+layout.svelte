<script>
	import { navigating } from "$app/stores"
	import { user } from "$lib/stores/session"
	import { supabase } from "$lib/db"

	import { getNavigationStore } from "$lib/viewTransition"
	import Header from "$lib/components/Header.svelte"
	import Footer from "$lib/components/Footer.svelte"

	import "$lib/scss/app.scss"

	let awaitingNavigating = false

	$: if ($navigating) awaitingNavigating = true
	$: if (awaitingNavigating) {
		if (document?.startViewTransition) {
			const navigation = getNavigationStore()
			const navigationComplete = navigation.complete()

			document.startViewTransition(async () => {
				await navigationComplete
				awaitingNavigating = false
			})
		}
	}

	$: async () => {
		session = { data: { session } } = await supabase.auth.getSession()
		$user = session?.user
	}

	supabase.auth.onAuthStateChange((_, session) => {
		$user = session?.user
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
