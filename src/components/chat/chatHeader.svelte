<script context="module">
	export async function load() {
		return null;
	}
</script>

<script lang="ts">
	// @ts-ignore
	import Icon from '@iconify/svelte';
	import arrowCircleLeft from '@iconify/icons-fa-solid/arrow-circle-left';
	import videoIcon from '@iconify/icons-fa-solid/video';

	import ellipsisH from '@iconify/icons-fa-solid/ellipsis-h';

	import Menu from './menu.svelte';

	import { selectedChat, showEmoji } from '../../stores/chat/index';

	let isMenuOpen = false;

	const handleBack = () => {
		selectedChat.update((v: string | undefined) => (v = undefined));
		showEmoji.update((v: boolean) => (v = false));
	};

	$: {
		console.log('===========', $selectedChat);
	}
</script>

<Menu bind:isMenuOpen />
<div id="chatHeader" class="parent grid grid-cols-6 w-full items-center">
	<div
		class:col-span-6={!$selectedChat}
		class="col-span-3 md:col-span-2 flex justify-start items-center"
	>
		<p class:hidden={$selectedChat}>select a dialouge</p>

		{#if $selectedChat}
			<button class="back btn btn-ghost flex md:hidden" on:click={handleBack}>
				<Icon icon={arrowCircleLeft} />
			</button>
		{/if}

		<p class="dialougeTitle">{$selectedChat}</p>
	</div>

	<div class="hidden md:flex col-span-2 justify-center">
		{#if $selectedChat}
			<button class="btn btn-primary btn-xs gap-2 md:flex">
				<Icon icon={videoIcon} />
				video call
			</button>
		{/if}
	</div>

	<div class="col-span-3  md:col-span-2 flex justify-end gap-2">
		{#if $selectedChat}
			<button class:hidden={!$selectedChat} class="btn btn-primary btn-xs gap-2 sm:hidden">
				<Icon icon={videoIcon} />
				video call
			</button>

			<button
				class:hidden={!$selectedChat}
				class="btn btn-primary btn-xs hidden md:flex justify-self-start"
				on:click={() => (isMenuOpen = !isMenuOpen)}
			>
				<Icon width="13" icon={ellipsisH} />
			</button>
		{/if}
	</div>
</div>

<style windi:preflight>
	.parent {
		@apply px-4;
		@apply py-2;
		@apply bg-gray-100;
		@apply border-b-1;
		@apply font-semibold;
		/* display: flex; */
		/* flex: auto; */
		/* align-items: center; */
	}

	.back {
		@apply text-blue-600;
		@apply text-lg;
		@apply rounded-full;
	}

	.back:hover {
		@apply text-blue-600;
	}

	.back:focus {
		@apply bg-blue-100;
		@apply outline-none;
		@apply border-none;
		@apply shadow-none;
	}

	.dialougeTitle {
		flex: auto;
	}
</style>
