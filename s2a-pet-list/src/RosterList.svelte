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
					<strong>{entry.name}</strong>
					<span>{entry.pet} · {entry.breed}</span>
				</li>
			{/each}
		</ul>
	{/if}
</section>

<style>
	.entries {
		margin-top: 40px;
	}

	h2,
	p {
		margin: 0;
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