<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { faBuilding, faFlag, faLightbulb, faSmile } from '@fortawesome/free-regular-svg-icons';
	import { faCat, faCoffee, faFutbol, faHistory, faMusic } from '@fortawesome/free-solid-svg-icons';
	import Icon from 'fa-svelte';
	import { showEmoji } from '../../../stores/chat/index';

	import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';

	/* import EmojiDetail from './EmojiDetail.svelte'; */
	import EmojiList from './EmojiList.svelte';
	import EmojiSearch from './EmojiSearch.svelte';
	import EmojiSearchResults from './EmojiSearchResults.svelte';
	import VariantPopup from './VariantPopup.svelte';

	import emojiData from './data/emoji.js';

	export let maxRecents = 50;
	export let autoClose = true;

	let pickerEl;
	let popper;

	let variantsVisible = false;

	let variants;
	let searchText;
	let recentEmojis = [];

	onMount(() => {
		if (localStorage) {
			recentEmojis = JSON.parse(localStorage.getItem('svelte-emoji-picker-recent')) || [];
		}
	});

	const dispatch = createEventDispatcher();

	const emojiCategories = {};
	emojiData.forEach((emoji) => {
		let categoryList = emojiCategories[emoji.category];
		if (!categoryList) {
			categoryList = emojiCategories[emoji.category] = [];
		}

		categoryList.push(emoji);
	});

	const categoryOrder = [
		'Smileys & People',
		'Animals & Nature',
		'Food & Drink',
		'Activities',
		'Travel & Places',
		'Objects',
		'Symbols',
		'Flags'
	];

	const categoryIcons = {
		'Smileys & People': faSmile,
		'Animals & Nature': faCat,
		'Food & Drink': faCoffee,
		Activities: faFutbol,
		'Travel & Places': faBuilding,
		Objects: faLightbulb,
		Symbols: faMusic,
		Flags: faFlag
	};

	function hidePicker(event) {
		searchText = '';
		popper.destroy();
	}

	function onKeyDown(event) {
		if (event.key === 'Escape') {
			hidePicker();
		}
	}

	/* function showEmojiDetails(event) { */
	/* 	currentEmoji = event.detail; */
	/* } */

	function onEmojiClick(event) {
		if (event.detail.variants) {
			variants = event.detail.variants;
			variantsVisible = true;
		} else {
			dispatch('emoji', event.detail.emoji);
			saveRecent(event.detail);

			if (autoClose) {
				hidePicker();
			}
		}
	}

	function onVariantClick(event) {
		dispatch('emoji', event.detail.emoji);
		saveRecent(event.detail);
		hideVariants();

		if (autoClose) {
			hidePicker();
		}
	}

	function saveRecent(emoji) {
		recentEmojis = [emoji, ...recentEmojis.filter((recent) => recent.key !== emoji.key)].slice(
			0,
			maxRecents
		);
		localStorage.setItem('svelte-emoji-picker-recent', JSON.stringify(recentEmojis));
	}

	function hideVariants() {
		// We have to defer the removal of the variants popup.
		// Otherwise, it gets removed before the click event on the body
		// happens, and the target will have a `null` parent, which
		// means it will not be excluded and the clickoutside event will fire.
		setTimeout(() => {
			variantsVisible = false;
		});
	}
</script>

<svelte:body on:keydown={onKeyDown} />

<div
	class:hidden={!$showEmoji}
	id="emojiPicker"
	class="picker"
	bind:this={pickerEl}
	on:keydown={onKeyDown}
>
	<EmojiSearch bind:searchText />
	{#if searchText}
		<EmojiSearchResults {searchText} on:emojiclick={onEmojiClick} />
	{:else}
		<div class="svelte-emoji-picker__emoji-tabs">
			<Tabs initialSelectedIndex={1}>
				<TabList>
					<Tab><Icon icon={faHistory} /></Tab>
					{#each categoryOrder as category}
						<Tab><Icon icon={categoryIcons[category]} /></Tab>
					{/each}
				</TabList>

				<TabPanel>
					<EmojiList name="Recently Used" emojis={recentEmojis} on:emojiclick={onEmojiClick} />
				</TabPanel>

				{#each categoryOrder as category}
					<TabPanel>
						<EmojiList
							name={category}
							emojis={emojiCategories[category]}
							on:emojiclick={onEmojiClick}
						/>
					</TabPanel>
				{/each}
			</Tabs>
		</div>
	{/if}

	{#if variantsVisible}
		<VariantPopup {variants} on:emojiclick={onVariantClick} on:close={hideVariants} />
	{/if}
</div>

<style>
	.picker {
		/* max-height: 300px; */
		@apply pt-4;
		@apply overflow-hidden;
		box-shadow: 15px -3px 18px rgb(0 0 0 / 10%);
		@apply bg-white;
		/* position: fixed; */
		/* bottom: 0; */
		/* width: 75%; */
	}

	/* .svelte-emoji-picker { */
	/* 	background: #ffffff; */
	/* 	border: 1px solid #cccccc; */
	/* 	border-radius: 5px; */
	/* 	width: 23rem; */
	/* 	height: 21rem; */
	/* 	margin: 0 0.5em; */
	/* 	box-shadow: 0px 0px 3px 1px #cccccc; */
	/* } */

	/* .svelte-emoji-picker__trigger { */
	/* 	cursor: pointer; */
	/* } */

	/* .svelte-emoji-picker__emoji-tabs { */
	/* 	padding: 0.25em; */
	/* 	height: 15rem; */
	/* } */

	/* :global(.svelte-emoji-picker__emoji-tabs .svelte-tabs ul.svelte-tabs__tab-list) { */
	/* 	display: flex; */
	/* } */

	/* :global(.svelte-emoji-picker__emoji-tabs .svelte-tabs li.svelte-tabs__tab) { */
	/* 	flex-grow: 1; */
	/* } */
</style>
