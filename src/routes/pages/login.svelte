<script>
	import { Link } from 'svelte-navigator';
	import { fade, fly } from 'svelte/transition';

	import Hoverable from '../Hoverable.svelte';

	let username = '',
		password = '';

	import { useNavigate } from 'svelte-navigator';

	const navigate = useNavigate();

	async function onSubmit() {
		const user = {
			username: username,
			password: password
		};

		console.log(JSON.stringify(user));
		const response = await fetch('http://localhost:8080/auth', {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
			body: JSON.stringify(user)
		})
			.then((response) => {
				return response.json();
			})
			.then((a) => {
				console.log(a.msg);
				if (a.msg == 'error') alert('This account does not existed!');
				else if (a.msg == 'error1') alert('Please enter Username and Password!');
				else {
					navigate('/chat', { replace: true });
				}
			});
	}
</script>

<div in:fly={{ y: -200, duration: 2000 }} out:fade class="bar">
	<div class="login-bar">
		<div class="headbar" />
		<h3>Username</h3>
		<input type="text" bind:value={username} placeholder="username" />
		<h3>Password</h3>
		<input type="text" bind:value={password} placeholder="password" /><br />
		<button on:click={onSubmit} class="login">Log In</button>
		<Hoverable let:hovering={active}>
			<Link to="/" style="text-decoration: none; color: black">
				<div class:active>Return</div>
			</Link>
		</Hoverable>
	</div>
</div>

<style>
	.headbar {
		width: 466px;
		height: 20px;
		background-color: grey;
	}

	.login {
		width: 207px;
		background-color: aqua;
		height: 40px;
		margin-top: 10px;
	}

	.bar {
		display: flex;
		justify-content: center;
	}

	.login-bar {
		width: 500px;
		border: black 1px solid;
		border-radius: 5px;
	}

	.active {
		background-color: #ff3e00;
		color: white;
	}

	h3 {
		font-weight: bold;
	}

	input {
		margin: 10px;
	}

	div {
		padding: 1em;
		margin: 0 0 1em 0;
	}
</style>
