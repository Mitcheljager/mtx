<script context="module">
  export function load({ error, status }) {
    return {
      props: { error, status }
    }
  }
</script>

<script>
  export let error
  export let status
</script>



<svelte:head>
	<title>Macrotransactions | { status }</title>
</svelte:head>



<h1>{ error.name } { status }</h1>

<p>{ error.message }</p>



<style>
  h1,
  p {
    text-align: center;
  }
</style>
