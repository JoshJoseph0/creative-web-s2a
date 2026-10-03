<script>
	let name = $state('')
	let pet = $state('')
	let entries = $state([])

	function addEntry(event) {
		event.preventDefault()

		const personName = name.trim()
		const petName = pet.trim()

		if (!personName || !petName) return

		entries = [...entries, { id: crypto.randomUUID(), name: personName, pet: petName }]
		name = ''
		pet = ''
	}
</script>

<main class="page">
	<section class="content" aria-labelledby="page-title">
		<h1 id="page-title">Pet list</h1>
		<p class="intro">Add your name and your pet's name.</p>

		<form onsubmit={addEntry}>
			<label for="person-name">Your name</label>
			<input id="person-name" bind:value={name} autocomplete="name" required />

			<label for="pet-name">Your pet's name</label>
			<input id="pet-name" bind:value={pet} required />

			<button type="submit">Add to list</button>
		</form>

		<section class="entries" aria-labelledby="entries-title" aria-live="polite">
			<h2 id="entries-title">Entries <span>{entries.length}</span></h2>
			{#if entries.length === 0}
				<p class="empty">No entries yet.</p>
			{:else}
				<ul>
					{#each entries as entry (entry.id)}
						<li><strong>{entry.name}</strong><span>{entry.pet}</span></li>
					{/each}
				</ul>
			{/if}
		</section>
	</section>
</main>

<style>
	.page {
		min-height: 100vh;
		box-sizing: border-box;
		padding: 64px 24px;
		background: #f6f8f5;
		color: #202820;
		font: 16px/1.5 'Segoe UI', sans-serif;
	}

	.content {
		width: min(100%, 480px);
		margin: 0 auto;
	}

	h1,
	h2,
	p {
		margin: 0;
	}

	h1 {
		font-size: 32px;
		line-height: 1.2;
	}

	.intro {
		margin-top: 8px;
		color: #59645a;
	}

	form {
		display: grid;
		gap: 8px;
		margin-top: 32px;
	}

	label {
		margin-top: 12px;
		font-weight: 600;
	}

	input {
		min-height: 44px;
		box-sizing: border-box;
		padding: 8px 12px;
		border: 1px solid #aeb9ad;
		border-radius: 4px;
		background: #fff;
		color: inherit;
		font: inherit;
	}

	input:focus-visible,
	button:focus-visible {
		outline: 3px solid #9bc8a2;
		outline-offset: 2px;
	}

	button {
		min-height: 44px;
		margin-top: 12px;
		padding: 8px 16px;
		border: 0;
		border-radius: 4px;
		background: #286744;
		color: #fff;
		font: inherit;
		font-weight: 600;
		cursor: pointer;
	}

	button:hover {
		background: #1f5236;
	}

	.entries {
		margin-top: 40px;
	}

	h2 {
		display: flex;
		align-items: baseline;
		gap: 8px;
		font-size: 18px;
	}

	h2 span,
	.empty {
		color: #657066;
	}

	ul {
		margin: 12px 0 0;
		padding: 0;
		list-style: none;
	}

	li {
		display: flex;
		justify-content: space-between;
		gap: 16px;
		padding: 12px 0;
		border-bottom: 1px solid #dce3da;
	}

	.empty {
		margin-top: 12px;
	}
</style>
