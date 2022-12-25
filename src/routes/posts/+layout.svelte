<script lang="ts">
	import { page } from "$app/stores"
	import { posts } from "./posts.js"
	import Box from "$lib/Box.svelte"
	import Meta from "$lib/Meta.svelte"
	$: path = $page.url.pathname
	$: meta = posts.find((post) => post.path === path)
</script>

{#if meta != null}
	<Meta title={meta.title} description={meta.description} />
{/if}

<Box tag="main" align="start" class="markdown">
	<slot />
	<a href="/">⬅️ back to homepage</a>
</Box>

<style>
	:global(.markdown p),
	:global(.markdown h1),
	:global(.markdown h2),
	:global(.markdown ul) {
		margin: 0.25em 0 0.2em 0;
	}
	a {
		color: #3cff00;
	}
	a:visited {
		color: #32d600;
	}
</style>
