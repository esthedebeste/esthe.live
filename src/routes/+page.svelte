<script lang="ts">
	import Box from "$lib/Box.svelte"
	import Meta from "$lib/Meta.svelte"
	import InvisibleA from "../lib/InvisibleA.svelte"
	import Post from "../lib/Post.svelte"
	import { posts } from "./posts/posts.js"
</script>

<Meta title="esthe.live!!!! whoahhh" />

<Box tag="main">
	<h1>HIII!!!</h1>
	welcome to the esthe page :3<br />
	my socials are @ the bottom of the page feel free to follow :) <br />
	going to be adding more stuff here soon :D (who's excited for the esthe blog & rss feed⁉️⁉️⁉️)
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
