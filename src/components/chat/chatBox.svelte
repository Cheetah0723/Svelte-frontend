<script context="module">
	export async function load() {
		return null;
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	/* import { watchResize } from 'svelte-watch-resize'; */
	import moment from 'moment';

	import Icon from '@iconify/svelte';
	import checkIcon from '@iconify/icons-fa-solid/check';
	import checkDouble from '@iconify/icons-fa-solid/check-double';
	import circleNotch from '@iconify/icons-fa-solid/circle-notch';
	import exclamationTriangle from '@iconify/icons-fa-solid/exclamation-triangle';

	import DownloadButton from './downloadButton.svelte';

	import { currentChat, currentUserId, showEmoji, selectedChat } from '../../stores/chat/index';

	let otherElementsHeight: number;
	let mounted = false;
	let chatDiv;
	let chatDivHeight: number;

	export let rows;

	$: {
		console.log($showEmoji, rows);
		if (mounted) {
			setTimeout(() => {
				const header: HTMLDivElement = document.querySelector('#chatHeader');
				const input: HTMLDivElement = document.querySelector('#chatInput');
				const emojiPicker: HTMLDivElement = document.querySelector('#emojiPicker');

				const headerH = header ? header.offsetHeight : 0;
				const inputH = input ? input.offsetHeight : 0;
				const emojiPickerH = emojiPicker ? emojiPicker.offsetHeight : 0;
				otherElementsHeight = headerH + inputH + emojiPickerH; // TODO: i do have no Idea without this 100 everything goes wild
			}, 0);
		}
	}

	let currentChatLength = 0;

	$: {
		if (chatDiv && $currentChat && $currentChat?.messages.length !== currentChatLength) {
			console.log('-----------------', $currentChat.messages.length);
			currentChatLength = $currentChat.messages.length;
			setTimeout(() => {
				chatDiv.scrollTop = chatDiv.scrollHeight;
			}, 10);
		}
	}

	onMount(() => {
		mounted = true;
	});

	let selectedImageData;

	const imageClick = (msgId: string) => {
		const msg = $currentChat.messages.find((msg) => msg.id === msgId);
		selectedImageData = msg.parts[0].value.data;
		console.log({ msgId, msg });
	};
</script>

<div
	bind:this={chatDiv}
	id="chatbox"
	class="parent"
	class:overflow-hidden={!$selectedChat}
	class:overflow-y-auto={$selectedChat}
	style={`height: calc(100vh - ${otherElementsHeight}px)`}
>
	{#if $currentChat}
		{#each $currentChat.messages as msg}
			<div
				class="dialouge"
				class:to={msg.userId === $currentUserId}
				class:from={msg.userId !== $currentUserId}
			>
				<p class="by">
					{msg.userId === $currentUserId ? 'you' : 'user_id ' + msg.userId}
				</p>
				{#each msg.parts as part}
					{#if part.type === 'text'}
						<p class="message-text">{part.value}</p>
					{:else if part.type === 'file' && part.value.type === 'image'}
						<label for="my-modal-2">
							<img
								src={part.value.data}
								alt={part.value.name}
								on:click={() => imageClick(msg.id)}
								class="w-auto max-w-xs rounded-lg transition duration-300 ease-in-out transform hover:scale-98"
							/>
						</label>
					{:else}
						<DownloadButton {part} />
					{/if}
				{/each}
				<div class="msg-footer">
					<p class="date my-2" class:failed={msg.state === 'failed'}>
						{moment(msg.timestamp).format('dddd, h:mm:ss a')}
					</p>
					{#if msg.state === 'seen'}
						<Icon width="13" color="#6EE7B7" icon={checkDouble} />
					{:else if msg.state === 'sent'}
						<Icon width="13" color="#D1D5DB" icon={checkIcon} />
					{:else if msg.state === 'hold'}
						<Icon class="animate-spin" width="13" color="#D1D5DB" icon={circleNotch} />
					{:else if msg.state === 'failed'}
						<Icon width="13" color="#FCA5A5" icon={exclamationTriangle} />
					{/if}
				</div>
			</div>
		{/each}
	{:else}
		<div class="hero min-h-screen bg-base-200">
			<div class="text-center hero-content">
				<div class="max-w-md">
					<h1 class="mb-5 text-5xl font-bold">Select a dialouge</h1>
				</div>
			</div>
		</div>
	{/if}
</div>

<input type="checkbox" id="my-modal-2" class="modal-toggle" />
<div class="modal">
	<div class="modal-box">
		<img src={selectedImageData} class="rounded-lg" alt="" />
		<div class="modal-action">
			<label for="my-modal-2" class="btn">Close</label>
		</div>
	</div>
</div>

<style windi:preflight>
	.parent {
		@apply px-4;
		@apply py-2;
		@apply bg-gray-100;
		display: flex;
		flex-direction: column;
		flex: auto;
		scroll-behavior: smooth;
		/* overflow-y: auto; */
	}

	.dialouge {
		@apply shadow-md;
		@apply py-2;
		@apply px-6;
		@apply my-2;
		@apply w-max;
		@apply bg-white;
		@apply rounded-lg;
		max-width: 90%;
	}

	.date {
		@apply text-xs;
		@apply text-gray-400;
		@apply mr-4;
	}

	.to {
		align-self: flex-end;
		@apply bg-green-50;
	}

	.from {
		@apply bg-white;
	}

	.by {
		@apply text-xs;
		@apply text-gray-400;
		@apply my-2;
	}

	.msg-footer {
		@apply flex;
		@apply flex-row;
		justify-content: space-between;
		align-items: flex-end;
	}

	.failed {
		@apply text-red-300;
	}

	.message-text {
		white-space: pre-line;
	}
</style>
