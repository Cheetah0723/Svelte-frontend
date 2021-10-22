<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import fileDownload from '@iconify/icons-fa-solid/file-download';

	const bytesToSize = (bytes) => {
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		if (bytes === 0) return 'n/a';
		const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
		if (i === 0) return `${bytes} ${sizes[i]})`;
		return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
	};

	export let part;

	let btn;
	let mouseenter = false;

	onMount(() => {
		btn.addEventListener('mouseover', () => {
			mouseenter = true;
		});
		btn.addEventListener('mouseout', () => {
			mouseenter = false;
		});
	});
</script>

<div
	class="card text-center border border-dashed lg:card-side my-5 bg-white w-sm text-accent-content"
>
	<div class="card-body">
		<div class="flex gap-2 justify-center items-center">
			<Icon icon={fileDownload} color="#6B7280" />
			<p>{part.value.name}</p>
		</div>
		<div class="justify-center card-actions">
			<button class="btn btn-accent" bind:this={btn}>
				<p class:hidden={mouseenter}>download</p>
				<p class:hidden={!mouseenter}>filesize : {bytesToSize(part.value.size)}</p>
			</button>
		</div>
	</div>
</div>
