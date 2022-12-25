<script lang="ts">
	import Space from "$lib/Space.svelte"
	import Links from "$lib/Links.svelte"
	import "../global.css"
</script>

<Space ro={35} rm={10} go={0} gm={5} bo={15} bm={10} />

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
