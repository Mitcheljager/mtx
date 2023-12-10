<script>
	import { images } from "$lib/stores/image"

	export let key

	$: image_url = $images[key]
</script>

{#if image_url}
	<img src={image_url} loading="lazy" class="background" alt="" role="presentation" />
{/if}

<style lang="scss">
	.background {
		$mask: linear-gradient(170deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0) 300px);

		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		opacity: 0.2;
		z-index: 0;
		filter: blur(50px);
		mask-image: $mask;
		-webkit-mask-image: $mask;

		@media (prefers-reduced-motion) {
			display: none;
		}

		@include safari() {
			display: none;
		}
	}
</style>
