import adapter from "@sveltejs/adapter-static"
import { vitePreprocess } from "@sveltejs/kit/vite"
import { mdsvex } from "mdsvex"

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess(), mdsvex({ extensions: [".md"] })],
	kit: {
		adapter: adapter(),
	},
	extensions: [".svelte", ".md"],
	compilerOptions: {
		sourcemap: true,
	},
}

export default config
