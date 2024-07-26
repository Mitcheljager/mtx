<script>
	/** @type {{Record<string, any>}} */
	let { from, key, ...rest } = $props();
</script>

<!-- svelte-ignore a11y_missing_attribute -->
<img loading="lazy" src="/image/{from}/{key}" {...rest} />
