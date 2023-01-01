<script lang="ts">
	import { page } from "$app/stores"
	import { posts } from "./posts.js"
	import Box from "$lib/Box.svelte"
	import Meta from "$lib/Meta.svelte"
	import Homepage from "../../lib/Homepage.svelte"
	import "./prism-onedark.css"
	$: path = $page.url.pathname
	$: meta = posts.find((post) => post.path === path)
</script>

<svelte:head>
	{#if meta != null}
		<Meta title={meta.title} description={meta.description} type="article" />
		<meta property="article:published_time" content={meta.ymd} />
		<meta property="article:author" content="esthe" />
	{:else}
		<Meta title="404" description="Page not found" />
	{/if}
</svelte:head>

<Box tag="main" align="start" class="markdown">
	<slot />
	<Homepage />
</Box>
