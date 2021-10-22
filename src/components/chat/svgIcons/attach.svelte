<script lang="ts">
	import { draw } from 'svelte/transition';

	export let showIcons: boolean;
</script>

<svg viewBox="-2 -2 52 52">
	{#if showIcons}
		<path
			class="attachIcon"
			in:draw={{ duration: 1500 }}
			d="M12.1,32.41L28.66,15.56a4.27,4.27,0,0,1,6.11,0h0a4.46,4.46,0,0,1,0,6.22L14.87,42c-3.61,3.68-8.66,3.88-11.66.83S0,35.56,4.15,31.37L28.9,6.16a10.47,10.47,0,0,1,15,0h0a10.93,10.93,0,0,1,0,15.27l-21.59,22"
		/>
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

	.attachIcon {
		stroke-width: 3px;
	}
</style>
