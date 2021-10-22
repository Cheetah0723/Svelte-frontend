<script lang="ts">
	import Header from './chatHeader.svelte';
	import Chatbox from './chatBox.svelte';
	import Inputs from './inputs.svelte';

	import EmojiSelector from './emoji/index.svelte';

	import { selectedChat } from '../../stores/chat/index';

	let rows;
	let value;

	const onEmoji = (event) => {
		if (!value) value = event.detail;
		else value += event.detail;
	};
</script>

<div class="chat">
	<Header />
	<Chatbox bind:rows />

	<EmojiSelector on:emoji={onEmoji} />
	{#if $selectedChat}
		<Inputs bind:value bind:rows />
	{/if}
</div>

<style windi:preflight>
	.chat {
		display: flex;
		flex-direction: column;
		height: 100%;
		@apply overflow-hidden;
	}
</style>
