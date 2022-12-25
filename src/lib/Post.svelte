<script lang="ts">
	import type { Post } from "../routes/posts/posts.js"
	import Box from "./Box.svelte"
	import InvisibleA from "./InvisibleA.svelte"
	export let post: Post
</script>

<InvisibleA href={post.path}>
	<Box tag="article" align="start">
		<h1>{post.title}</h1>
		<p>{post.description}</p>
		<time datetime={post.ymd}>{post.ymd}</time>
	</Box>
</InvisibleA>

<style>
	h1 {
		color: var(--link-color);
		padding: 0;
		margin: 0;
	}
	:global(a):visited h1 {
		color: var(--link-visited-color);
	}
	:global(a):hover h1 {
		transform: scaleX(130%) translateX(12%);
		text-decoration: underline;
		transition: transform 175ms ease-in-out;
	}
	p {
		margin: 0;
		padding: 0;
	}
	time {
		font-style: italic;
	}
</style>
