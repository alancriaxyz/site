import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import markdown from './src/lib/utils/markdown/index.js'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],

	preprocess: [markdown(), vitePreprocess()],

	kit: {
		adapter: adapter({
			routes: {
				include: ["/*"],
				exclude: ["<all>", "/mysitemap.xml"],
			},
		}),
	},
};

export default config;