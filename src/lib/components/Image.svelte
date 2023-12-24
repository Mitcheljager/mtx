<script>
	import { onMount } from "svelte"

	import { images } from "$lib/stores/image"

	export let supabase
	export let from
	export let key

	$: getImage()

	async function getImage() {
		if (key in $images) return

		try {
			const data = await getSupabaseImage(supabase, from, key)

			$images = { ...$images, [key]: data?.publicUrl }
		} catch (error) {
			console.error(error)
		}
	}

	export async function getSupabaseImage(supabase, from, key) {
		const { data, error } = await supabase.storage.from(from).getPublicUrl(key)

		if (error) throw error

		return data
	}

	// Fallback for parsers to prevent errors. This doesn't do anything in modern browsers.
	function noOp() {}
	if (typeof URL.createObjectURL === "undefined") {
		Object.defineProperty(URL, "createObjectURL", { value: noOp })
	}
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<img loading="lazy" src={$images[key]} {...$$restProps} />
