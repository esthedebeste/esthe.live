<script lang="ts">
	import Discord from "./icons/Discord.svelte"
	import Github from "./icons/Github.svelte"
	import Mastodon from "./icons/Mastodon.svelte"
	import Rss from "./icons/RSS.svelte"
	import Twitch from "./icons/Twitch.svelte"
	import Twitter from "./icons/Twitter.svelte"
</script>

<ul>
	<li><Twitch /></li>
	<li><Twitter /></li>
	<li><Mastodon /></li>
	<li><Github /></li>
	<li><Discord /></li>
	<li><Rss /></li>
</ul>

<style>
	ul {
		font-size: min(3em, 15vw);
		display: flex;
		flex-direction: row;
		list-style: none;
		margin: 0;
		position: fixed;
		height: fit-content;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		background-color: #ffffff0b;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		padding: 0.4em;
		gap: 0.3ch;
	}
	:global(body[data-darkness="true"]) ul {
		font-size: min(1.5em, 7.5vw);
		background-color: #ffffff01;
		opacity: 0.25;
		left: unset;
		right: 0;
		top: 0;
		transform: translateX(0%);
		gap: 0.7ch;
	}
	/* Seperate because a decent amount of people don't have `:has` yet, and a comma expression would fully fail to apply because the matcher would fail to parse. */
	:global(body:has(darkness)) ul { 
		font-size: min(1.5em, 7.5vw);
		background-color: #ffffff01;
		opacity: 0.25;
		left: unset;
		right: 0;
		top: 0;
		transform: translateX(0%);
		gap: 0.7ch;
	}
	li {
		line-height: 1em;
	}
</style>
