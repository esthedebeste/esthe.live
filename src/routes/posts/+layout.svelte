<script lang="ts">
	import { page } from "$app/stores"
	import Box from "$lib/Box.svelte"
	import Homepage from "$lib/Homepage.svelte"
	import Meta from "$lib/Meta.svelte"
	import { posts, type Post } from "./posts.js"
	import "./prism-onedark.css"
	$: path = $page.url.pathname
	$: meta = posts.find(post => post.path === path) as Post
</script>

<Meta title={meta.title} description={meta.description} type="article" />
<svelte:head>
	<meta property="article:published_time" content={meta.ymd} />
	<meta property="article:author" content="esthe" />
</svelte:head>

<Box tag="main" align="start" class="markdown">
	<slot />
	<Homepage />
</Box>
