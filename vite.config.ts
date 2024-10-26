import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vitest/config"

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ["src/**/*.{test,spec}.{js,ts}"]
	},
	css: {
		preprocessorOptions: {
			scss: {
				appendData: `
					@use "src/lib/scss/_functions.scss" as *;
					@use "src/lib/scss/_variables.scss" as *;
					@use "src/lib/scss/_mixins.scss" as *;
				`
			}
		}
	}
})
