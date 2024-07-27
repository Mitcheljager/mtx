<script>
	import { user, userLoaded } from "$lib/stores/session"
	import { supabase } from "$lib/db"
	import { onNavigate } from "$app/navigation"

	import Header from "$lib/components/Header.svelte"
	import Footer from "$lib/components/Footer.svelte"

	import "$lib/scss/app.scss"
  import { onMount } from "svelte"

	/** @type {{children?: import('svelte').Snippet}} */
	const { children } = $props()

	onNavigate((navigation) => {
		if (!document.startViewTransition) return

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve()
				await navigation.complete
			})
		})
	})

	onMount(async () => {
		const { data: { session } } = await supabase.auth.getSession()
		$user = session?.user
		$userLoaded = true
	})

	supabase.auth.onAuthStateChange((_, session) => {
		$user = session?.user
		$userLoaded = true
	})
</script>

<Header />

<main>
	{@render children?.()}
</main>

<Footer />

<style lang="scss">
	main {
		width: 100%;
		max-width: var(--max-width);
		margin: 0 auto;
	}
</style>
