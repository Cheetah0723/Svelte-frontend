<script>
	import { Router, Route } from 'svelte-navigator';
	import Chat from './pages/chat.svelte';
	import Home from './pages/home.svelte';
	import Login from './pages/login.svelte';
	import Signup from './pages/signup.svelte';

	// This is time
	import { time, elapsed } from './stores.js';

	const formatter = new Intl.DateTimeFormat('en', {
		hour12: true,
		hour: 'numeric',
		minute: '2-digit',
		second: '2-digit'
	});
</script>

<Router>
	<div class="header">
		<h1>The time is {formatter.format($time)}</h1>
		<p>
			This page has been open for
			{$elapsed}
			{$elapsed === 1 ? 'second' : 'seconds'}
		</p>
	</div>

	<main>
		<div>
			<Route path="/chat">
				<Chat />
			</Route>
			<Route path="/">
				<Home />
			</Route>
			<Route path="/login">
				<Login />
			</Route>
			<Route path="/signup">
				<Signup />
			</Route>
		</div>
	</main>
</Router>

<style>
	main {
		text-align: center;
		margin: 0 auto;
		background: url('./background.jpg') no-repeat center center;
		background-size: cover;
		min-height: 1028px;
		padding: 0 !important;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 2em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	.header {
		background-color: #eee;
	}
</style>
