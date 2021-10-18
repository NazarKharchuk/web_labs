<script>
	let formData;
	let error;
	function checkValidate() {
		error = formData.Email.value == '';

		const ToSend = {
			FMessage: formData.messege.value,
			FMail: formData.Email.value
		};

		fetch('/api/server', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(ToSend)
		})
			.then((resp) => {
				if (resp.ok) {
					alert('Mail sent!');
					console.log(resp);
				}
				return resp.json();
			})
			.then((data) => {
				console.log(data);
				alert(data.cod);
			})
			.catch((e) => alert(e));
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<form bind:this={formData} on:submit|preventDefault={checkValidate} id="form">
		<h1 class="form_title">Відправка E-mail</h1>
		<div class="form_item">
			<label for="formMail" class="form_label">Електронна адреса:</label>
			<input id="formMail" type="text" name="Email" class="form_input _req _gmail" />
			{#if error}
				<p>Error:</p>
			{/if}
		</div>
		<div class="form_item">
			<label for="formMessege" class="form_label">Текст електронного листа:</label>

			<textarea name="messege" id="formMessege" class="form_input _req" />
		</div>
		<button type="submit" class="form_item">Надіслати!</button>
	</form>
</section>

<style>
	:root {
		--error-color: #1708e6;
		--background-color: #c1c8e4;
		--text-color: #0a39af;
		--background-item-color: #d9dff8;
		--background-button-color: #e5eafd;
		--background-button-color2: #ccd6fa;
		--border-button-color: #1150f0;
	}

	._error {
		box-shadow: 0 0 20px var(--error-color);
	}

	form {
		max-width: 400px;
		margin: auto;
	}

	form * {
		outline: none;
	}

	.form_title {
		text-align: center;
		font-weight: 500;
	}

	.form_item {
		margin: 10px 0 15px 0;
	}

	.form_label {
		font-size: 20px;
		display: block;
		margin: 0 0 10px 0;
	}

	.form_input {
		border-radius: 10px;
		height: 50px;
		width: 100%;
		font-size: 20px;
		border-color: var(--text-color);
		border-width: 2px;
		padding: 10px;
		box-sizing: border-box;
	}

	.form_input:focus {
		box-shadow: 0 0 10px var(--border-button-color);
	}

	textarea {
		min-height: 100px;
		resize: vertical;
	}

	section {
		background-color: var(--background-color);
		color: var(--text-color);
		height: 100vh;
	}

	input,
	textarea,
	button {
		background-color: var(--background-item-color);
		color: var(--text-color);
	}

	input:-webkit-autofill {
		-webkit-text-fill-color: var(--text-color) !important;
	}

	button {
		width: 100%;
		min-height: 50px;
		background-color: var(--background-button-color);
		font-size: 25px;
		border-radius: 40px;
		border-color: var(--border-button-color);
		border-width: 3px;
		transition: background-color 0.5s;
		position: relative;
		top: 0;
		box-shadow: 0 3px 0 var(--text-color);
	}

	button:hover {
		background-color: var(--background-button-color2);
	}

	button:active {
		top: 3px;
		box-shadow: 0 0 0 var(--text-color);
	}
</style>
