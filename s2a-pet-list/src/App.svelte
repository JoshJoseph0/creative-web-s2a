<script>
	import StudentForm from './Studentform.svelte'
	import RosterList from './RosterList.svelte'
</script>

<main class="page">
	<section class="content" aria-labelledby="page-title">
		<h1 id="page-title">Pet list</h1>
		<p class="intro">Add your name and your pet's name.</p>

		<!-- The form and roster list share their data through roster.svelte.js. -->
		<StudentForm />
		<RosterList />
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

</style>
