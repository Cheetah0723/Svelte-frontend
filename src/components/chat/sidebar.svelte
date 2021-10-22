<script lang="ts">
	import Item from './sidebarItem.svelte';

	import { chats } from '../../stores/chat/index';
</script>

<div class="parent">
	<div class="header">
		<p>Chats</p>
	</div>

	{#each $chats as chat}
		<Item value={chat.id} />
	{/each}
</div>

<style windi:preflight>
	.parent {
		@apply bg-white;
	}

	.header {
		@apply px-4;
		@apply py-2;
		@apply bg-gray-100;
		@apply border-b-1;
		@apply border-r-1;
		@apply font-semibold;
	}
</style>
