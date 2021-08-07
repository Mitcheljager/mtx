<script context="module">
	import { browser, dev } from "$app/env"

	export const hydrate = dev
	export const router = browser
	export const prerender = true
</script>



<div class="wrapper">
  <h1>Privacy</h1>

  <small>Last updated 07 aug 2021</small>

  <p>
    No data is collected. <br>
    No cookies are set.
  </p>

  <p>
    That's it.
  </p>
</div>



<style lang="scss">
  small {
    color: var(--text-color-dark);
  }
</style>
