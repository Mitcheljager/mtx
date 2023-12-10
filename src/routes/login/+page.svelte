<script>
	import { supabase } from "$lib/db"

	let loading = false
	let email = null

	const handleLogin = async () => {
		try {
			loading = true

			const { error } = await supabase.auth.signIn({ email })

			if (error) throw error

			alert("Check your email for the login link!")
		} catch (error) {
			alert(error.error_description || error.message)
		} finally {
			loading = false
		}
	}
</script>

<form class="" on:submit|preventDefault={handleLogin}>
	<h1>Login</h1>
	<p>
		Sign in via magic link with your email below. <br />
		<small>If you don't already have an account this page is of no use to you.</small>
	</p>

	<div>
		<input class="form-input" type="email" placeholder="Your email" bind:value={email} />
	</div>

	<div>
		<input
			type="submit"
			class="button button--primary mt-1/4"
			value={loading ? "Loading..." : "Send magic link"}
			disabled={loading}
		/>
	</div>
</form>

<style lang="scss">
	form {
		max-width: 400px;
		margin: 0 auto;
	}
</style>
