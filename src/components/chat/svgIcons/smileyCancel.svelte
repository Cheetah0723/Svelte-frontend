<script lang="ts">
	import { draw } from 'svelte/transition';

	export let showIcons: boolean;
</script>

<svg xmlns="http://www.w3.org/2000/svg" class="crossIcon" viewBox="0 0 48 48" version="1.1">
	<circle in:draw={{ duration: 1500 }} id="path847" cx="24" cy="24" r="21.213022" />
	<path in:draw={{ duration: 1500 }} d="M 12.749127,12.749127 35.250873,35.250873" id="path1151" />
	<path in:draw={{ duration: 1500 }} d="M 35.250873,12.749127 12.749127,35.250873" id="path1153" />
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

	.crossIcon circle {
		stroke-width: 3px;
	}

	path,
	circle {
		@apply stroke-current;
		@apply text-blue-600;
		@apply stroke-2;
		@apply fill-none;
	}

	svg {
		height: h-128;
		width: w-128;
		@apply mb-9;
	}
</style>
