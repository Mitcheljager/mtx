<script lang="ts">
  import { onMount } from "svelte";

  export let supabase
  export let from
  export let key

  let src = ''

  onMount(getImage)

  async function getImage() {
    try {
      const data = await getSupabaseImage(supabase, from, key)

      src = URL.createObjectURL(data)
    } catch (error) {
      console.error(error)
    }
  }

  export async function getSupabaseImage(supabase, from, key) {
    const { data, error } = await supabase
    .storage
    .from(from)
    .download(key)

    if (error) throw error

    return data
  }

  // Fallback for parsers to prevent errors. This doesn't do anything in modern browsers.
  function noOp () { }
  if (typeof URL.createObjectURL === "undefined") {
    Object.defineProperty(URL, "createObjectURL", { value: noOp })
  }
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<img
  loading="lazy"
  { src }
  { ...$$restProps } />
