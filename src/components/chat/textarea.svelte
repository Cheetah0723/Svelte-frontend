<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let value = '';
	export let id: string;
	export let rows = 1;

	const dispatch = createEventDispatcher();
	const keypress = (event) => {
		dispatch('keypress', event.keyCode);
	};

	$: {
		const num = value.split('\n').length;
		if (num > 4) {
			rows = 4;
		} else {
			rows = num;
		}
	}

	/* $: minHeight = `${1 + minRows * 1.2}em`; */
	/* $: maxHeight = maxRows ? `${1 + maxRows * 1.2}em` : `auto`; */
</script>

<div class="container">
	<textarea class="textarea" rows={rows ? rows : 1} bind:value on:keypress={keypress} />
</div>

<style>
	.container {
		@apply px-3;
	}

	textarea {
		@apply py-2;
		@apply px-4;
		@apply outline-none;
		@apply border-solid;
		@apply border-white;
		@apply w-full;
		@apply transform;
		@apply transition;
		@apply overflow-y-auto;
		resize: none;
		@apply shadow-none;
		@apply rounded-md;
	}
</style>
