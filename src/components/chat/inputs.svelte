<script lang="ts">
	import { onMount } from 'svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import Textarea from './textarea.svelte';

	import { showEmoji, chats, selectedChat } from '../../stores/chat/index';

	import AttachIcon from './svgIcons/attach.svelte';
	import SendIcon from './svgIcons/send.svelte';
	import SmileyIcon from './svgIcons/smiley.svelte';
	import SmileyCancelIcon from './svgIcons/smileyCancel.svelte';

	export let value;
	export let rows = 1;

	let showIcons = false;
	let fileinput;

	const handleShowEmoji = () => showEmoji.update((v: boolean) => (v = !v));

	// TODO: delete later
	const randId = (length: number): string => {
		var result = '';
		var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for (var i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	};

	type TFile = {
		type: string;
		ext: string;
		data: string | ArrayBuffer;
		name: string;
		size: number;
	};

	const sendFile = ({ type, ext, name, data, size }: TFile) => {
		const id = randId(6);
		chats.update((v) => {
			return v.map((chat) => {
				if (chat.id === $selectedChat) {
					chat.messages.push({
						id,
						timestamp: new Date().getTime(),
						userId: '1',
						parts: [
							{
								type: 'file',
								value: {
									type,
									ext,
									data,
									name,
									size
								}
							}
						],
						state: 'hold'
					});
					return chat;
				} else {
					return chat;
				}
			});
		});

		setTimeout(() => {
			chats.update((v) => {
				return v.map((chat) => {
					console.log(chat);
					if (chat.id === $selectedChat) {
						chat.messages.map((c) => {
							if (c.id === id) {
								c.state = 'sent';

								return c;
							} else {
								return c;
							}
						});
						return chat;
					} else {
						return chat;
					}
				});
			});
		}, 2000);
	};

	const sendMsg = () => {
		if (value) {
			const id = randId(6);
			chats.update((v) => {
				return v.map((chat) => {
					if (chat.id === $selectedChat) {
						chat.messages.push({
							id,
							timestamp: new Date().getTime(),
							userId: '1',
							parts: [
								{
									type: 'text',
									value: value.trim()
								}
							],
							state: 'hold'
						});
						return chat;
					} else {
						return chat;
					}
				});
			});

			setTimeout(() => {
				chats.update((v) => {
					return v.map((chat) => {
						console.log(chat);
						if (chat.id === $selectedChat) {
							chat.messages.map((c) => {
								if (c.id === id) {
									c.state = 'sent';

									return c;
								} else {
									return c;
								}
							});
							return chat;
						} else {
							return chat;
						}
					});
				});
			}, 2000);

			value = '';
			rows = 1;
		} else {
			toast.push('Write something please!', {
				theme: {
					'--toastBackground': '#EF4444',
					'--toastBarBackground': '#DC2626'
				}
			});
		}
	};

	const onFileSelected = (e) => {
		let file = e.target.files[0];
		console.log({ file });
		const mime = file.type;
		const type = mime.split('/')[0];
		const ext = mime.split('/')[1];
		console.log({ type, ext });

		/* if (type === 'image' || ext === 'pdf') { */
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (e) => {
			console.log(e.target.result);
			sendFile({ type, ext, name: file.name, data: e.target.result, size: file.size });
			/* avatar = e.target.result; */
		};
		/* } */
	};

	const handleKeypress = (e) => {
		if (e.detail === 13) {
			rows = rows + 1;
		} else if (e.detail === 10) {
			sendMsg();
		}
	};

	onMount(() => {
		showIcons = false;
		setTimeout(() => {
			showIcons = true;
		}, 0);

		/* if (document) { */
		/* 	console.log({ document }); */
		/* 	document.addEventListener('keypress', (e) => { */
		/* 		console.log(e.keyCode); */
		/* 		/1* const chat *1/ */
		/* 	}); */
		/* } */
	});
</script>

<div id="chatInput" class="parent">
	<button class="icon-btn" on:click={handleShowEmoji}>
		{#if $showEmoji === false}
			<SmileyIcon showIcons />
		{:else}
			<SmileyCancelIcon showIcons />
		{/if}
	</button>

	<Textarea bind:value id="chatInput" bind:rows on:keypress={handleKeypress} />

	<button
		class="icon-btn"
		on:click={() => {
			fileinput.click();
		}}
	>
		<input type="file" class="attach" bind:this={fileinput} on:change={(e) => onFileSelected(e)} />
		<AttachIcon showIcons />
	</button>

	<button class="icon-btn" on:click={sendMsg}>
		<SendIcon showIcons />
	</button>
</div>

<style windi:preflight>
	.parent {
		z-index: 1;
		box-shadow: 0px -1px 23px #00000024;
		@apply px-5;
		@apply py-2;
		/* @apply pb-5; */
		@apply gap-2;
		@apply bg-gray-100;
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		/* position: absolute; */
		/* bottom: 0; */
		/* left: 0; */
		/* right: 0; */
	}

	.icon-btn {
		@apply rounded-full;
		@apply text-blue-600;
		@apply outline-none;
		@apply transform;
		@apply transition;
		height: 25px;
		width: 25px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.icon-btn:active {
		@apply scale-90;
	}

	input.attach {
		display: none;
	}
</style>
