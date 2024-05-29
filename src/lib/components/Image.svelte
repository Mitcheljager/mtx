<script>
	export let from
	export let key
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<img loading="lazy" src="/image/{from}/{key}" {...$$restProps} />
