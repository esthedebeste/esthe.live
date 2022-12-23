<script lang="ts">
	import Discord from "./icons/Discord.svelte"
	import Github from "./icons/Github.svelte"
	import Twitch from "./icons/Twitch.svelte"
	import Twitter from "./icons/Twitter.svelte"
	import { onMount } from "svelte"
	let discord = "https"
	onMount(() => {
		// open in app if on pc, phones dont implement discord://
		discord = "ontouchstart" in window ? "https" : "discord"
	})
</script>

<ul>
	<li>
		<a target="_blank" rel="noreferrer" href="https://twitch.tv/esthedebeste"><Twitch /></a>
	</li>
	<li>
		<a target="_blank" rel="noreferrer" href="https://twitter.com/esthedebeste"><Twitter /></a>
	</li>
	<li>
		<a target="_blank" rel="noreferrer" href="https://github.com/tbhmens"><Github /></a>
	</li>
	<li>
		<a
			target="_blank"
			rel="nofollow noreferrer"
			href="{discord}://discord.com/users/342607061059633153"><Discord /></a
		>
	</li>
</ul>

<style>
	a {
		font-size: 4em;
	}
	ul {
		display: flex;
		flex-direction: row;
		gap: 3ch;
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		padding: 1em;
		background-color: #ffffff0b;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
	}
	li {
		line-height: 1em;
	}
</style>
