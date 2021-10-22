<script lang="ts">
	import { draw } from 'svelte/transition';

	export let showIcons: boolean;
</script>

<svg viewBox="0 0 32 32">
	{#if showIcons}
		<g id="telegram_3_"
			><path
				class="sendIcon"
				in:draw={{ duration: 1500 }}
				d="m 21.566338,11.991278 -7.298424,6.381202 a 1.7182991,1.7182991 89.503463 0 0 0.02259,2.606575 l 10.132723,8.55402 a 1.1712978,1.1712978 160.5263 0 0 1.905807,-0.673898 L 30.997248,4.5755522 A 1.0949645,1.0949645 39.58155 0 0 29.516783,3.351608 L 1.708856,14.428144 a 0.7228066,0.7228066 88.151496 0 0 0.043855,1.358842 l 5.2892942,1.720793 a 3.8438357,3.8438357 45.510092 0 1 2.4866688,2.531344 l 1.7485992,5.718934 a 1.2282766,1.2282766 14.554344 0 0 2.026133,0.526044 l 3.390625,-3.261729"
			/></g
		>
	{/if}
</svg>

<style windi:preflight>
	svg {
		height: h-128;
		width: w-128;
		@apply mb-9;
	}

	path {
		@apply stroke-current;
		@apply text-blue-600;
		@apply stroke-2;
		@apply fill-none;
	}

	.sendIcon {
		stroke-width: 2px;
	}
</style>
