<script>
	import { roster } from './roster.svelte.js'
</script>

<section class="entries" aria-labelledby="entries-title" aria-live="polite">
	<h2 id="entries-title">Entries <span>{roster.entries.length}</span></h2>
	{#if roster.entries.length === 0}
		<!-- Explain the empty list until the first student is added. -->
		<p class="empty">No entries yet.</p>
	{:else}
		<ul>
			{#each roster.entries as entry (entry.id)}
				<li>
					<div class="entry-details">
						<strong>{entry.pet}</strong>
						<span>Added by {entry.name}</span>
					</div>
					<span class="breed">{entry.breed}</span>
				</li>
			{/each}
		</ul>
	{/if}
</section>

<style>
	.entries {
		margin-top: 0;
	}

	h2,
	p {
		margin: 0;
	}

	h2 {
		display: flex;
		align-items: baseline;
		gap: 10px;
		font-size: 22px;
		letter-spacing: -0.03em;
	}

	h2 span,
	.empty {
		color: #8a7e87;
	}

	h2 span {
		display: grid;
		min-width: 26px;
		height: 26px;
		place-items: center;
		padding: 0 6px;
		border-radius: 999px;
		background: #fce8eb;
		color: #ba5b72;
		font-size: 13px;
		font-weight: 600;
	}

	ul {
		margin: 20px 0 0;
		padding: 0;
		list-style: none;
	}

	li {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 16px 0;
		border-bottom: 1px solid #f0e8eb;
	}

	.entry-details {
		display: grid;
		gap: 2px;
		min-width: 0;
	}

	.entry-details strong {
		overflow-wrap: anywhere;
		font-size: 15px;
	}

	.entry-details span {
		color: #8a7e87;
		font-size: 13px;
	}

	.breed {
		max-width: 45%;
		padding: 5px 10px;
		border-radius: 999px;
		background: #fce8eb;
		color: #a54f66;
		font-size: 12px;
		text-align: center;
	}

	.empty {
		margin-top: 18px;
		font-size: 14px;
	}
</style>