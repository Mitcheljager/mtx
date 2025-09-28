<script>
	import { supabase } from "$lib/db";

	async function logout() {
	  const { error } = await supabase.auth.signOut();

	  document.cookie = "";

	  if (error) throw new Error(error.message);
	}
</script>

{#await logout()}
	Logging you out...
{:then data}
	Logged out
{:catch error}
	<p>Something went wrong while logging you out:</p>
	<pre>{error}</pre>
{/await}
