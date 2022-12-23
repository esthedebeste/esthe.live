<script lang="ts">
	import Space from "$lib/Space.svelte"
	import "../global.css"
	import Links from "../lib/Links.svelte"
</script>

<Space ro={35} rm={10} go={0} gm={5} bo={15} bm={10} />

<div>
	<slot />
</div>

<Links />

<style>
	div {
		margin-left: auto;
		margin-right: auto;
		margin-top: 1em;
	}
</style>
