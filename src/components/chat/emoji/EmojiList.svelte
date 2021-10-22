<script>
	import Emoji from './Emoji.svelte';

	export let name = '';
	export let withTabs = true;
	export let emojis;
</script>

<h3>{name}</h3>

<div class="list" class:tall={!withTabs}>
	{#each emojis as emoji}
		<Emoji {emoji} on:emojihover on:emojiclick />
	{/each}
</div>

<style>
	.list {
		max-height: 200px;
		overflow-y: auto;
		font-size: x-large;
	}
	/*   h3 { */
	/*     margin: 0.25em; */
	/*     font-size: 0.9em; */
	/*     color: #333333; */
	/*   } */

	/*   .svelte-emoji-picker__emoji-list { */
	/*     height: 11rem; */
	/*     overflow: scroll; */
	/*   } */

	/*   .svelte-emoji-picker__emoji-list.tall { */
	/*     height: 14.9rem; */
	/*   } */
</style>
