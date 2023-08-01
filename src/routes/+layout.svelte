<script lang="ts">
	import { page } from "$app/stores"
	import Links from "$lib/Links.svelte"
	import "../global.css"
	import Space from "../lib/Space.svelte"
</script>

<!-- Fun fact! You're seeing this comment in your DevTools because of me :3 https://github.com/sveltejs/svelte/pull/7182 (live since 3.58.0) -->

{#if $page.url.pathname.startsWith("/darkness/!")}
	<Space ro={150} rm={1} go={150} gm={1} bo={150} bm={0.5} scale={10} />
{:else if $page.url.pathname.startsWith("/darkness")}
	<Space ro={0} rm={0.18} go={0} gm={0.03} bo={0} bm={0.02} scale={4} />
{:else}
	<Space ro={35} go={0} bo={15} />
{/if}

<div>
	<slot />
</div>

<footer>
	<Links />
</footer>

<style>
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-bottom: 6em; /* footer */
	}
</style>
