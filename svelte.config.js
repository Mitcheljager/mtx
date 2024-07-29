import preprocess from "svelte-preprocess"
import adapter from "@sveltejs/adapter-cloudflare"
import { mdsvex } from "mdsvex"

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		preprocess({
			preserve: ["ld+json"],
			scss: {
				includePaths: ["src"],
				prependData: `
					@import "src/lib/scss/_variables.scss";
					@import "src/lib/scss/_mixins.scss";
				`
			},
		}),
		mdsvex({
      extensions: [".md"],
      layout: "./src/routes/post.svelte"
    })
	],

	extensions: [".svelte", ".md"],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		inlineStyleThreshold: 4096,
	}
}

export default config
