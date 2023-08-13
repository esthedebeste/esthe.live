<script lang="ts">
	import type { Mini } from "../routes/minis/minis"
	import Box from "./Box.svelte"
	import GetSilly from "./GetSilly.svelte"

	export let preview = false
	export let mini: Mini
	$: date =
		mini &&
		new Intl.DateTimeFormat(undefined, {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			second: "2-digit",
			era: "long",
			weekday: "long",
			fractionalSecondDigits: 1,
		}).format(new Date(mini.date))

	function share() {
		navigator.share({
			title: mini!.title,
			text: mini!.text,
			url: new URL(`/minis/${mini!.uuid}`, location.href).href,
		})
	}
</script>

<Box align="start" background="#faa3">
	{#if preview}
		<GetSilly mini>{mini.title}</GetSilly>
	{:else}
		<h1>{mini.title}</h1>
	{/if}
	<p>
		{mini.text}
		<button type="button" on:click|preventDefault={share}>share!</button>
	</p>
	<date>{date}</date>
	<slot />
</Box>

<style>
	h1 {
		font-size: 1.2em;
		word-break: break-all;
	}
	h1,
	p {
		margin: 0;
		padding: 0;
	}
	date {
		font-style: italic;
		font-size: 0.75em;
	}
	button {
		transition: all 0.25s;
		cursor: pointer;
		font-size: 0.75em;
		border: none;
		border-radius: 4px;
		background: #05a;
		padding: 0.25em 0.5em;
		color: #fff;
		text-shadow: 0 0 8px #fff;
		box-shadow: 0 0 8px #05a;
	}
	button:active,
	button:hover {
		background: #05f;
		box-shadow: 0 0 8px #05f;
		transform: scaleY(1.2);
	}
</style>
