<script lang="ts">
	import { SvelteToast } from '@zerodevx/svelte-toast';

	import { selectedChat } from '../../stores/chat/index';
	import Sidebar from './sidebar.svelte';
	import Chat from './chat.svelte';
</script>

<div class="background" />
<div class="overlay" />
<div class="wrapper">
	<div class={`col-span-12 md:col-span-3 ${$selectedChat ? 'hidden' : ''} md:block bg-white z-2`}>
		<Sidebar />
	</div>
	<div
		class={`col-span-12 md:col-span-9 ${!$selectedChat ? 'hidden' : ''} md:block overflow-hidden`}
	>
		<Chat />
	</div>
</div>

<SvelteToast />

<style windi:preflight>
	.wrapper {
		@apply container;
		@apply mx-auto;
		@apply grid;
		@apply grid-cols-12;
		@apply overflow-hidden;
		@apply gb-gray-200;
		@apply shadow-2xl;
		@apply relative;
		height: 100vh;
	}

	.background {
		@apply absolute;
		@apply top-0;
		@apply bottom-0;
		@apply left-0;
		@apply right-0;
		@apply bg-gray-300;
		z-index: -1;
	}

	.overlay {
		@apply absolute;
		@apply top-0;
		@apply bottom-0;
		@apply left-0;
		@apply right-0;
		background-image: url('/1.svg');
		z-index: -1;
		background-size: cover;
		opacity: 0.5;
		mix-blend-mode: luminosity;
	}
</style>
