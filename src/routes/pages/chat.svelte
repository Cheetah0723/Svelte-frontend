<script>
	import { Link } from 'svelte-navigator';
	import Chat from '../../components/chat/index.svelte';

	import Hoverable from '../Hoverable.svelte';
</script>

<div class="out">
	<Hoverable let:hovering={active}>
		<Link to="/" style="text-decoration: none; color: black">
			<div class:active>Log out</div>
		</Link>
	</Hoverable>
</div>
<div>
	<Chat />
</div>

<style>
	.out {
		width: 120px;
		height: 60px;
		background-color: grey;
		font-size: 15px;
		position: absolute;
		top: 5px;
		right: 60px;
	}

	div {
		padding: 10px;
	}
	.active {
		background-color: #ff3e00;
		color: white;
	}
</style>
