<script lang="ts">
	import Form from "$lib/components/Form.svelte"
	import { user, userLoaded } from "$lib/stores/session"
	import { goto } from "$app/navigation"
	import { browser } from "$app/environment"
  import type { Game } from "$lib/types/Game"

	interface Props { data: { game: Game } }

	const { data } : Props = $props()

	const { game } = $derived(data)

	$effect.pre(() => {
		if (browser && $userLoaded && !$user) goto("/login")
	})
</script>

<div class="wrapper">
	<h2>Edit game "{game.title}"</h2>

	<Form {game} />
</div>

<style lang="scss">
	h2 {
		text-align: center;
	}
</style>
