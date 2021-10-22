<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import checkIcon from '@iconify/icons-fa-solid/check';

	let mounted: boolean = false;

	export let isMenuOpen;

	let isFirstClick: boolean;

	const clickHandler = (e) => {
		const elements = document.elementsFromPoint(e.pageX, e.pageY);
		const doesExists = !!elements.find((e) => e.id === 'chatMenu');
		console.log({ doesExists });
		if (!isFirstClick && !doesExists) isMenuOpen = false;
		if (isFirstClick) {
			isFirstClick = false;
		}
	};

	$: {
		if (mounted) {
			if (isMenuOpen) {
				isFirstClick = true;
				document.addEventListener('click', clickHandler);
			} else {
				document.removeEventListener('click', clickHandler);
			}
		}
	}

	onMount(() => {
		mounted = true;
	});
</script>

<ul
	id="chatMenu"
	class="menuParent menu p-4 shadow-lg bg-base-100 rounded-box"
	class:hidden={!isMenuOpen}
>
	<li class="menu-title">
		<span> Menu </span>
	</li>
	<li>
		<button class="btn btn-ghost">
			<Icon color="#10B981" icon={checkIcon} />
			complete the encounter
		</button>
	</li>
</ul>

<style windi:preflight>
	.menuParent {
		position: absolute;
		right: 15px;
		top: 50px;
		background: white;
	}

	.hidden {
		display: none;
	}

	button {
		@apply gap-2;
	}

	button:hover {
		@apply text-white;
	}
</style>
