<script>
	import { Link, useNavigate } from 'svelte-navigator';
	import { fade, fly } from 'svelte/transition';

	import Hoverable from '../Hoverable.svelte';

	const navigate = useNavigate();

	let username = '',
		password = '',
		email = '',
		confirmpassword = '';

	export async function onSubmit() {
		const user = {
			username: username,
			password: password,
			email: email
		};

		console.log(JSON.stringify(user));
		const response = await fetch('http://localhost:8080/add', {
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
				if (a.msg == 'error') alert('This already existed.');
				else navigate('/login', { replace: true });
			});
	}
</script>

<div in:fly={{ y: 200, duration: 1000 }} out:fade class="bar">
	<div class="sign-bar">
		<div class="headbar" />
		<h3>Username</h3>
		<input type="text" bind:value={username} placeholder="username" />
		<h3>Email</h3>
		<input type="email" bind:value={email} placeholder="Email" />
		<h3>Password</h3>
		<input type="text" bind:value={password} placeholder="password" />
		<h3>Confirm Password</h3>
		<input type="text" bind:value={confirmpassword} placeholder="confirm password" />
		<br />

		{#if username != '' && password != '' && email != ''}
			{#if password != confirmpassword}
				{#if confirmpassword == ''}
					<h4>Check your password</h4>
				{:else}
					<h4>Confirm password Error. Write again!</h4>
				{/if}
			{:else}
				<button on:click={onSubmit} class="signup">Sign Up</button>
			{/if}
		{:else}
			<h4>In put all fields</h4>
		{/if}
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
	.signup {
		width: 207px;
		background-color: aqua;
		height: 40px;
		margin-top: 10px;
	}

	.bar {
		display: flex;
		justify-content: center;
	}

	.sign-bar {
		width: 500px;
		border: black 1px solid;
		border-radius: 5px;
	}

	h4 {
		color: red;
	}

	div {
		padding: 1em;
		margin: 0 0 1em 0;
	}

	.active {
		background-color: #ff3e00;
		color: white;
	}

	input {
		margin: 10px;
	}

	h3 {
		font-weight: bold;
	}
</style>
