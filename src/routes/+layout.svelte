<script lang="ts">
	import Space from "$lib/Space.svelte"
	import Links from "$lib/Links.svelte"
	import "../global.css"
	import { page } from "$app/stores"
</script>

{#if $page.url.pathname.startsWith("/darkness")}
	<Space ro={3} rm={20} go={1} gm={7} bo={1} bm={3} />
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
