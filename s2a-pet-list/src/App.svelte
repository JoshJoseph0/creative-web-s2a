<script>
	import StudentForm from './Studentform.svelte'
	import RosterList from './RosterList.svelte'
	import Register from './register.svelte'
</script>

<main class="page">
	<section class="content" aria-labelledby="page-title">
		<header class="page-header">
			<div>
				<h1 id="page-title">Pet Registration</h1>
				<p class="intro">Add dogs to the register and check them in for doggie day care.</p>
			</div>
		</header>

		<div class="roster-card">
			<section class="panel form-panel" aria-labelledby="form-title">
				<p class="section-label">NEW FRIEND</p>
				<h2 id="form-title">Add to the pack</h2>
				<p class="panel-copy">Tell us a little about you and your dog.</p>
				<StudentForm />
			</section>

			<section class="panel output-panel" aria-label="Pet roster entries">
				<RosterList />
			</section>
		</div>

		<section class="panel register-panel" aria-label="Dog check-in register">
			<Register />
		</section>
	</section>
</main>

<style>
	.page {
		min-height: 100vh;
		box-sizing: border-box;
		padding: clamp(40px, 8vh, 88px) 24px;
		background:
			radial-gradient(ellipse at 100% 0%, rgb(255 213 222 / 52%), transparent 38%),
			#fff7f5;
		color: #29252b;
		font: 16px/1.5 'Segoe UI', sans-serif;
	}

	#page-title {
		margin-bottom: 32px;
		margin-top: 32px;
	}	

	.panel.output-panel {
		margin-top: 2px;
	}

	.content {
		width: min(100%, 1040px);
		margin: 0 auto;
	}

	p {
		margin: 0;
	}

	.page-header {
		display: flex;
		align-items: center;
		gap: 18px;
		margin-bottom: 32px;
	}

	.section-label {
		color: #c25e78;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.14em;
	}

	h1 {
		margin: 2px 0;
		font-size: clamp(28px, 4vw, 36px);
		line-height: 1.15;
		letter-spacing: -0.04em;
	}

	.intro {
		color: #766e76;
	}

	.roster-card {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		align-items: start;
		overflow: hidden;
		border: 1px solid #f1e5e7;
		border-radius: 24px;
		background: #fff;
		box-shadow: 0 22px 60px rgb(111 65 76 / 10%);
	}

	.panel {
		min-width: 0;
		padding: clamp(28px, 5vw, 52px);
	}

	.form-panel h2 {
		margin: 4px 0 6px;
		font-size: 25px;
		line-height: 1.2;
		letter-spacing: -0.03em;
	}

	.panel-copy {
		color: #766e76;
	}

	.output-panel {
		min-height: 270px;
		background: #fffafb;
		border-left: 1px solid #f1e5e7;
	}

	.form-panel {
		border-right: 0;
	}

	.register-panel {
		margin-top: 24px;
		border: 1px solid #f1e5e7;
		border-radius: 24px;
		background: #fffafb;
		box-shadow: 0 22px 60px rgb(111 65 76 / 10%);
	}

	@media (max-width: 720px) {
		.page {
			padding: 40px 18px;
		}

		.panel {
			padding: 30px 24px;
		}

		.roster-card {
			grid-template-columns: 1fr;
		}

		.output-panel {
			min-height: auto;
			border-top: 1px solid #f1e5e7;
			border-left: 0;
		}
	}
</style>
