<script>
	import { roster } from './roster.svelte.js'
</script>

<section class="register" aria-live="polite">
	<h2 id="register-title">Dog check-in register <span>{roster.entries.length}</span></h2>

	{#if roster.entries.length === 0}
		<p class="empty">No dogs in the register yet. Add one below to get started.</p>
	{:else}
		<ul>
			{#each roster.entries as entry (entry.id)}
				<li>
					<div class="dog-details">
						<strong>{entry.pet}</strong>
						<span>{entry.breed}</span>
					</div>
					<label class="check-in">
						<input type="checkbox" bind:checked={entry.checkedIn} />
						<span>{entry.checkedIn ? 'Checked in' : 'Check in'}</span>
					</label>
				</li>
			{/each}
		</ul>
	{/if}
</section>

<style>
	.register {
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
	.dog-details span {
		color: #8a7e87;
		font-size: 14px;
		font-weight: 400;
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
		gap: 16px;
		padding: 14px 0;
		border-bottom: 1px solid #f0e8eb;
	}

	.dog-details {
		display: grid;
		gap: 2px;
	}

	.check-in {
		display: flex;
		align-items: center;
		gap: 8px;
		color: #a54f66;
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
	}

	.check-in input {
		width: 18px;
		height: 18px;
		accent-color: #ee8295;
	}

	.empty {
		margin-top: 18px;
		color: #8a7e87;
		font-size: 14px;
	}
</style>
