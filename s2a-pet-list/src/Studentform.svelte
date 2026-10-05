<script>
	import { roster } from './roster.svelte.js'

	// These values only hold what is currently being typed into the form.
	let name = $state('')
	let pet = $state('')
	let breed = $state('')

	function addEntry(event) {
		event.preventDefault()

		const personName = name.trim()
		const petName = pet.trim()
		const petBreed = breed.trim()

		if (!personName || !petName || !petBreed) return

		// Add directly to the roster shared with RosterList.svelte.
		roster.entries.push({ id: crypto.randomUUID(), name: personName, pet: petName, breed: petBreed })
		name = ''
		pet = ''
		breed = ''
	}
</script>

<form onsubmit={addEntry}>
	<label for="person-name">Your name</label>
	<input id="person-name" bind:value={name} autocomplete="name" required />

	<label for="pet-breed">Your pet's breed</label>
	<input id="pet-breed" bind:value={breed} required />

	<label for="pet-name">Your pet's name</label>
	<input id="pet-name" bind:value={pet} required />

	<button type="submit">Add to list</button>
</form>

<style>
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
</style>
