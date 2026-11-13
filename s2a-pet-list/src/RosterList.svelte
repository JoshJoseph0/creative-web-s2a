<script>
	import { roster } from './roster.svelte.js'
</script>
	<section>
		<h1>Dog breed information</h1>
	</section>

<<<<<<< Updated upstream

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
=======
<section class="entries" aria-labelledby="entries-title" aria-live="polite">
	<header class="entries-heading">
		<h2 id="entries-title">Roster</h2>
		<span class="entry-count">{roster.entries.length} entries</span>
	</header>
	<div class="column-headings" aria-hidden="true">
		<span>Student</span>
		<span>Pet</span>
	</div>
	{#if roster.entries.length === 0}
		<p class="empty">No students added yet.</p>
	{:else}
		<ul>
			{#each roster.entries as entry (entry.id)}
				<li>
					<span class="handwriting">{entry.name}</span>
					<span class="handwriting">{entry.pet}</span>
				</li>
			{/each}
		</ul>
	{/if}
</section>
>>>>>>> Stashed changes
