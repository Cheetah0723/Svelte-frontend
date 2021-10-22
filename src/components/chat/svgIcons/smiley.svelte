<script lang="ts">
	import { draw } from 'svelte/transition';

	export let showIcons: boolean;
</script>

<svg viewBox="0 0 48 48" class="smileyIcon">
	<circle in:draw={{ duration: 1500 }} class="cls-1" cx="24" cy="24" id="circle8" r="22.553507" />
	<path
		in:draw={{ duration: 1500 }}
		class="cls-2"
		d="m 14.194127,32.825286 c 0,0 8.658586,9.148879 19.611746,0"
		id="path10"
	/>
	<ellipse
		in:draw={{ duration: 1500 }}
		class="cls-3"
		cx="17.135889"
		cy="19.097063"
		rx="2.941762"
		ry="3.9223492"
		id="ellipse12"
	/>
	<ellipse
		in:draw={{ duration: 1500 }}
		class="cls-3"
		cx="30.864111"
		cy="19.097063"
		rx="2.941762"
		ry="3.9223492"
		id="ellipse14"
	/>
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

	.smileyIcon circle,
	path {
		stroke-width: 3px;
	}

	.smileyIcon ellipse {
		@apply fill-current;
		@apply text-blue-600;
		@apply stroke-0;
	}

	path,
	ellipse,
	circle {
		@apply stroke-current;
		@apply text-blue-600;
		@apply stroke-2;
		@apply fill-none;
	}
</style>
