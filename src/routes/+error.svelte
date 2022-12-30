<script lang="ts">
	import Meta from "../lib/Meta.svelte"
	import { page } from "$app/stores"
	import Box from "../lib/Box.svelte"
	import Homepage from "../lib/Homepage.svelte"
	$: status = $page.status.toString() + " :("
	$: error = $page.error?.message + " :3"
</script>

<Meta title={status} description={error} />
<Box tag="main">
	<h1>{status}</h1>
	<p>{error}</p>
	<Homepage />
</Box>
