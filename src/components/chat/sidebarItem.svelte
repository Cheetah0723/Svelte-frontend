<script lang="ts">
	import { selectedChat } from '../../stores/chat/index';

	export let value: string;

	let isSelected: boolean = false;

	$: {
		isSelected = $selectedChat === value;
	}

	const handleSelected = () => selectedChat.update((v) => (v = value));
</script>

<div>
	<button
		on:click={handleSelected}
		class="btn btn-block rounded-none chat"
		class:isSelected
		class:isNotSelected={!isSelected}
	>
		<p>chatbox id {value}</p>
	</button>
</div>

<style windi:preflight>
	/* .btn { */
	/* @apply w-full; */
	/* @apply py-2; */
	/* @apply px-4; */
	/* @apply bg-white; */
	/* @apply transform; */
	/* @apply transition; */
	/* } */

	/* .btn:active { */
	/* 	@apply scale-90; */
	/* } */

	/* .btn:hover:not(.isSelected) { */
	/* 	@apply bg-gray-200; */
	/* 	@apply text-black; */
	/* } */

	/* .isSelected { */
	/* 	@apply bg-blue-600; */
	/* 	@apply text-white; */
	/* 	@apply border-r-5; */
	/* 	@apply border-blue-800; */
	/* } */
	/* .notSelected { */
	/* 	@apply btn-outline; */
	/* 	/1* @apply border-none; *1/ */
	/* 	@apply border-r-5; */
	/* 	@apply border-blue-800; */
	/* } */

	.btn.chat {
		border-width: 0px 5px 0px 0px;
	}

	.btn.chat:focus {
		/* outline: none !important; */
		/* outline-offset: 0px !important; */
		/* border: none !important; */
		box-shadow: none !important;
	}

	.btn.chat:hover {
		@apply text-white;
	}

	.isSelected {
		@apply btn-primary;
		@apply border-blue-800;
	}

	.isNotSelected {
		@apply btn-ghost;
		@apply border-gray-300;
	}

	.isNotSelected:hover {
		@apply bg-gray-200;
	}

	button {
		justify-content: flex-start;
	}
	/* .chat.btn-ghost { */
	/* 	@apply bg-gray-100; */
	/* 	@apply border-gray-300; */
	/* } */

	/* .chat.btn-ghost:hover { */
	/* 	@apply bg-gray-300; */
	/* } */
</style>
