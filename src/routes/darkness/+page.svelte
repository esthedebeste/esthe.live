<script lang="ts">
	import { page } from "$app/stores"
	import Meta from "$lib/Meta.svelte"
	import Question from "./Question.svelte"
	// in case svelte starts optimizing ors away, i want both the $page and the location to be checked every time.
	const or = (a: boolean, b: boolean) => a || b
</script>

{#if or($page.url.href.endsWith("?"), globalThis.location?.search !== "" || globalThis.location?.href.endsWith("?"))}
	<Meta title="darkness?" description=";p" />
	<Question />
{:else}
	<Meta title="darkness" description=":3" />
	<main>
		angel,<br />
		<small>come closer.</small>
	</main>
{/if}

<style>
	:global(body) {
		background: #0e0403;
		overflow: hidden;
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
		text-shadow:
			0 0 1.5em #8b0000,
			0 0 1.5em darkred;
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
