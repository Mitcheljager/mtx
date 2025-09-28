<script lang="ts">
	import { user, userLoaded } from "$lib/stores/session";
	import { onNavigate } from "$app/navigation";
	import type { Snippet } from "svelte";
  import { onMount } from "svelte";
  import type { NavigationType } from "@sveltejs/kit";

	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";

	import "$lib/scss/app.scss";

	interface Props { children?: Snippet }

	const { children } : Props = $props();

	// @ts-expect-error View transitions are iffy
	onNavigate((navigation: Exclude<NavigationType, "enter" | "leave">) => {
	  if (!document.startViewTransition) return;

	  return new Promise<void>((resolve) => {
	    document.startViewTransition(async () => {
	      resolve();
	      // @ts-expect-error It's fine if it doesn't work in unsupported browsers
	      await navigation.complete;
	    });
	  });
	});

	onMount(async () => {
	  // Load supabase only when cookie is set. Log in is still entirely based on supabase itself,
	  // this cookie only determines if supabase will load or not
	  if (!document.cookie.includes("mtx_attempt_login=true")) return;

	  try {
	    const { supabase } = await import("$lib/db");

	    const { data: { session } } = await supabase.auth.getSession();
	    $user = session?.user || null;
	    $userLoaded = true;
	  } catch (error) {
	    console.error("Could not log you in", error);
	  }
	});
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
