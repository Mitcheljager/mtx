<script>
	import { user } from "$lib/stores/session"
	import { supabase } from "$lib/db"
	import { onNavigate } from '$app/navigation'

	import Header from "$lib/components/Header.svelte"
	import Footer from "$lib/components/Footer.svelte"

	import "$lib/scss/app.scss"

	onNavigate((navigation) => {
		if (!document.startViewTransition) return

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve()
				await navigation.complete
			})
		})
	})

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
