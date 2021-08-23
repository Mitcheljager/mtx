<script lang="ts">
  import { supabaseImages } from "svelte-supabase-lazy-images"

  export let key: string

  $: image_url = $supabaseImages[key]
</script>



{ #if image_url }
  <img src={ image_url } class="background" alt="" role="presentation" />
{ /if }



<style lang="scss">
  .background {
		$mask: linear-gradient(170deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0) 300px);

		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		opacity: .2;
		z-index: 0;
		filter: blur(50px);
		mask-image: $mask;
		-webkit-mask-image: $mask;
	}
</style>
