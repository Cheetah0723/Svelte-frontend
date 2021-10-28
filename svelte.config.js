import preprocess from 'svelte-preprocess';
import WindiCSS from 'vite-plugin-windicss/dist/index.mjs';

import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: adapter(),
		vite: {
			ssr: {
				external: ['@xstate/svelte']
			},
			plugins: [
				WindiCSS({
					scan: {
						dirs: ['.'], // all files in the cwd
						fileExtensions: ['svelte', 'js', 'ts'] // also enabled scanning for js/ts
					}
				})
			]
		}
	}
};

export default config;
