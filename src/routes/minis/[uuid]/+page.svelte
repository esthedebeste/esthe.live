<script lang="ts">
	import { page } from "$app/stores"
	import Box from "$lib/Box.svelte"
	import Homepage from "$lib/Homepage.svelte"
	import Meta from "$lib/Meta.svelte"
	import Mini from "$lib/Mini.svelte"
	import { getMini } from "../minis"
	import type { RouteParams } from "./$types"

	$: mini = getMini(($page.params as RouteParams).uuid)
</script>

{#if mini == null}
	<h1>mini</h1>
	<Box align="start">404</Box>
{:else}
	<Meta title={mini.title} description={mini.text} type="article" />
	<Mini {mini}><Homepage /></Mini>
{/if}
