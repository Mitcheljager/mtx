<script lang="ts">
  import Image from "$lib/components/Image.svelte"

	const { key = "" } = $props()
</script>

<div class="background">
	<Image
		{key}
		from="games"
		width={80}
		height={106}
		role="presentation"
		alt="" />
</div>

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
		overflow: hidden;

		@media (prefers-reduced-motion) {
			display: none;
		}

		@include safari() {
			display: none;
		}

		@include high-contrast() {
			display: none;
		}

		:global(img) {
			width: 100%;
			height: auto;
		}
	}
</style>
