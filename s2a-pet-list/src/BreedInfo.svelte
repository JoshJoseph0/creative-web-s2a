<script>
	import { breedInfo } from './roster.svelte.js'

	const traitLabels = {
		energy: 'Energy',
		trainability: 'Trainability',
		barking: 'Barking',
		grooming: 'Grooming',
		shedding: 'Shedding',
		drooling: 'Drooling',
		good_with_children: 'Good with children',
		good_with_dogs: 'Good with dogs',
		good_with_strangers: 'Good with strangers',
		apartment_friendly: 'Apartment friendly',
		exercise_minutes: 'Exercise'
	}

	let selectedBreed = $derived(
		breedInfo.breeds.find((details) => details.name === breedInfo.selectedBreed)
	)
</script>

<section>
	<p class="section-label">TEMPERAMENT &amp; CARE</p>
	{#if selectedBreed}
		<h2>{selectedBreed.name}</h2>
		{#if selectedBreed.traits?.temperament?.length}
			<ul class="temperament">
				{#each selectedBreed.traits.temperament as trait (trait)}
					<li>{trait}</li>
				{/each}
			</ul>
		{/if}
		<dl>
			{#each Object.entries(selectedBreed.traits ?? {}).filter(([key, value]) => key !== 'temperament' && value != null) as [key, value] (key)}
				<div>
					<dt>{traitLabels[key] ?? key}</dt>
					<dd>{key === 'exercise_minutes' ? `${value} min/day` : `${value}/5`}</dd>
				</div>
			{/each}
		</dl>
	{:else}
		<h2>Dog breed information</h2>
		<p class="empty">Choose a breed to see its temperament and care details.</p>
	{/if}
</section>

<style>
	.section-label {
		margin: 0;
		color: #c25e78;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.14em;
	}

	h2 {
		margin: 8px 0 16px;
		font-size: 22px;
	}

	.temperament {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin: 0 0 20px;
		padding: 0;
		list-style: none;
	}

	.temperament li {
		padding: 4px 10px;
		border-radius: 999px;
		background: #f8e8eb;
		color: #70404b;
		font-size: 13px;
	}

	dl {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 12px;
		margin: 0;
	}

	dl div {
		padding: 10px 12px;
		border-radius: 10px;
		background: #fff;
	}

	dt {
		color: #766e76;
		font-size: 12px;
	}

	dd {
		margin: 2px 0 0;
		font-weight: 600;
	}

	.empty {
		color: #766e76;
	}
</style>
