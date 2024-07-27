<script lang="ts">
	import type { HTMLImgAttributes } from "svelte/elements"

	type Props = {
    from: string,
		key: string,
  } & HTMLImgAttributes

	const { from, key, ...rest } : Props = $props()
</script>

<!-- svelte-ignore a11y_missing_attribute -->
<img loading="lazy" src="/image/{from}/{key}" {...rest} />
