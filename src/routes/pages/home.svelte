<script>
	import { Link } from 'svelte-navigator';
	import Hoverable from '../Hoverable.svelte';
	import { fade, fly } from 'svelte/transition';
</script>

<div in:fly={{ y: -200, duration: 1000 }} out:fade class="accessButton">
	<Hoverable let:hovering={active}>
		<Link to="/login" style="text-decoration: none; color: black">
			<div class:active>Log in</div>
		</Link>
	</Hoverable>

	<hr />

	<Hoverable let:hovering={active}>
		<Link to="/signup" style="text-decoration: none; color: black">
			<div class:active>Sign up</div>
		</Link>
	</Hoverable>
</div>

<style>
	.accessButton {
		width: 260px;
		background-color: grey;
		font-size: 18px;
		position: absolute;
		top: 20px;
		right: 100px;
		letter-spacing: 4px;
	}

	@media (min-width: 640px) {
		div {
			padding: 0.5em;
			margin: 0.5em 0 0.5em 0;
		}
	}

	.active {
		background-color: #ff3e00;
		color: white;
	}
</style>
