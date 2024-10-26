<script lang="ts">
	import { user, userLoaded } from "$lib/stores/session"
	import { supabase } from "$lib/db"
	import { onNavigate } from "$app/navigation"
	import type { Snippet } from "svelte"
  import { onMount } from "svelte"
  import type { NavigationType } from "@sveltejs/kit"

	import Header from "$lib/components/Header.svelte"
	import Footer from "$lib/components/Footer.svelte"

	import "$lib/scss/app.scss"

	interface Props { children?: Snippet }

	const { children } : Props = $props()

	// @ts-ignore
	onNavigate((navigation: Exclude<NavigationType, 'enter' | 'leave'>) => {
		if (!document.startViewTransition) return

		return new Promise<void>((resolve) => {
			document.startViewTransition(async () => {
				resolve()
			// @ts-ignore
				await navigation.complete
			})
		})
	})

	onMount(async () => {
		const { data: { session } } = await supabase.auth.getSession()
		$user = session?.user || null
		$userLoaded = true
	})

	supabase.auth.onAuthStateChange((_, session) => {
		$user = session?.user || null
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
