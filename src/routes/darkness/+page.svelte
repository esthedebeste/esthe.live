<script lang="ts">
	import Meta from "$lib/Meta.svelte"
</script>

<Meta title="darkness" description=":3" />
<main>
	angel,<br />
	<small>come closer.</small>
</main>

<style>
	:global(body) {
		background: #0e0403;
	}
	main {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-family: "Times New Roman", serif;
		font-size: 2em;
		text-align: center;
		color: #fff;
		text-shadow: 0 0 1.5em #8b0000, 0 0 1.5em darkred;
	}
	small {
		display: block;
		font-size: 0.4em;
		opacity: 0.75;
		text-decoration: underline;
		text-decoration-color: rgba(255, 0, 0, 0.3);
	}
	small::selection {
		background: red;
	}
</style>
