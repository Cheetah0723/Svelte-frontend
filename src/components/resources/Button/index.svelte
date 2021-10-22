<script lang="ts">
	export let primary: boolean = true;

	export let block;
</script>

<button class="btn" class:primary class:block><slot /></button>

<style windi:preflight>
	.btn {
		@apply m-1;
		@apply py-2;
		@apply px-4;
		@apply rounded-lg;
		@apply shadow-md;
		@apply text-opacity-80;
		@apply transition-colors;
		@apply transform;
		@apply transition;
	}

	.btn:focus {
		@apply outline-none;
	}

	.btn:active {
		@apply scale-90;
	}

	.block {
		@apply w-full;
		@apply rounded-none;
	}
</style>
