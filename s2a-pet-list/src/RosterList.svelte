<script>
	import { roster } from './roster.svelte.js'
</script>
	<section>
		<h1>Dog breed information</h1>
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