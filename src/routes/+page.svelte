<script lang="ts">
	import Box from "$lib/Box.svelte"
	import Meta from "$lib/Meta.svelte"
	import Post from "$lib/Post.svelte"
	import { posts } from "./posts/posts.js"
</script>

<Meta title="esthe.live!!!! whoahhh" />

<Box tag="main">
	<h1>HIII!!!</h1>
	<p>
		welcome to the esthe page :3<br />
		my socials are at the bottom of the page (as well as my rss feed⁉️⁉️⁉️) so feel free to follow :)
		<br />
		i'm going to use this site to post about my projects and stuff, so if you're interested in that,
		you can subscribe to the rss feed! <br />
		site made with sveltekit :D (source code is on
		<a href="https://github.com/tbhmens/esthe-live">github</a>)
	</p>
</Box>

<h1>posts!</h1>

{#each posts as post}
	<Post {post} />
{/each}

<style>
	h1 {
		padding: 0;
		margin: 0;
	}
</style>
