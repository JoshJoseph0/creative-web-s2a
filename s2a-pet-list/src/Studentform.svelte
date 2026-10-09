<script>
	import { onMount } from 'svelte'
	import { breedInfo, roster } from './roster.svelte.js'

	let name = $state('')
	let pet = $state('')
	let breeds = $state([])
	let breedsLoading = $state(true)
	let breedError = $state('')

	onMount(async () => {
		try {
			let nextUrl = 'https://dogapi.dog/api/v2/breeds?page[size]=100&page[number]=1'
			const breedDetails = []
			const visitedPages = new Set()
			let expectedPage = 1

			while (nextUrl) {
				if (visitedPages.has(nextUrl)) throw new Error('Dog API repeated a breed page')
				visitedPages.add(nextUrl)

				const response = await fetch(nextUrl)
				if (!response.ok) throw new Error(`Dog API returned ${response.status}`)

				const data = await response.json()
				const pagination = data.meta?.pagination

				if (
					!Array.isArray(data.data) ||
					!Number.isInteger(pagination?.current) ||
					pagination.current !== expectedPage
				) {
					throw new Error('Dog API returned an invalid breed page')
				}

				breedDetails.push(
					...data.data
						.map((item) => item.attributes)
						.filter((attributes) => typeof attributes?.name === 'string')
				)

				const next = data.links?.next
				if (next != null && typeof next !== 'string')
					throw new Error('Dog API returned an invalid next-page link')
				nextUrl = typeof next === 'string' ? next : ''
				expectedPage += 1
			}

			breedInfo.breeds = [
				...new Map(breedDetails.map((details) => [details.name, details])).values()
			].sort((a, b) => a.name.localeCompare(b.name))
			breeds = breedInfo.breeds.map((details) => details.name)
			if (breeds.length === 0) throw new Error('Dog API returned no breeds')
		} catch (error) {
			console.error('Failed to load dog breeds:', error)
			const reason = error instanceof Error ? error.message : 'Unknown error'
			breedError = `Dog breeds could not be loaded: ${reason}. Please try again.`
		} finally {
			breedsLoading = false
		}
	})

	function addEntry(event) {
		event.preventDefault()

		const personName = name.trim()
		const petName = pet.trim()
		const petBreed = breedInfo.selectedBreed.trim()

		if (!personName || !petName || !petBreed) return

		roster.entries.push({
			id: crypto.randomUUID(),
			name: personName,
			pet: petName,
			breed: petBreed,
			checkedIn: false
		})
		name = ''
		pet = ''
		breedInfo.selectedBreed = ''
	}
</script>

<form onsubmit={addEntry}>
	<label for="pet-breed">Your dog's breed</label>
	<select id="pet-breed" bind:value={breedInfo.selectedBreed} required disabled={breedsLoading || breeds.length === 0}>
		<option value="" disabled>
			{breedsLoading ? 'Loading breeds…' : 'Select a breed'}
		</option>
		{#each breeds as breedName (breedName)}
			<option value={breedName}>{breedName}</option>
		{/each}
	</select>
	{#if breedError}
		<p class="breed-error" role="alert">{breedError}</p>
	{/if}

	<label for="person-name">Your name</label>
	<input id="person-name" bind:value={name} autocomplete="name" required />

	<label for="pet-name">Your dog's name</label>
	<input id="pet-name" bind:value={pet} required />

	<button type="submit">Add pet <span aria-hidden="true">→</span></button>
</form>

<style>
	form {
		display: grid;
		gap: 10px;
		margin-top: 24px;
	}

	label {
		margin-top: 7px;
		color: #49434b;
		font-size: 14px;
		font-weight: 600;
	}

	input,
	select {
		min-height: 48px;
		box-sizing: border-box;
		padding: 10px 14px;
		border: 1px solid #e6dfe3;
		border-radius: 10px;
		background: #fffdfd;
		color: inherit;
		font: inherit;
		transition: border-color 150ms ease, box-shadow 150ms ease;
	}

	input:focus-visible,
	select:focus-visible,
	button:focus-visible {
		outline: 3px solid rgb(245 139 154 / 35%);
		outline-offset: 2px;
	}

	input:focus,
	select:focus {
		border-color: #e78396;
		box-shadow: 0 0 0 3px rgb(245 139 154 / 14%);
	}

	.breed-error {
		margin: 0;
		color: #a11;
	}

	button {
		display: flex;
		min-height: 50px;
		align-items: center;
		justify-content: center;
		gap: 10px;
		margin-top: 14px;
		padding: 8px 18px;
		border: 0;
		border-radius: 10px;
		background: #ee8295;
		color: #fff;
		font: inherit;
		font-weight: 600;
		cursor: pointer;
		transition: background 150ms ease, transform 150ms ease;
	}

	button:hover {
		background: #dc6c83;
		transform: translateY(-1px);
	}
</style>
