<script lang="ts">
	import type { Post } from "../routes/posts/posts.js"
	import Box from "./Box.svelte"
	import GetSilly from "./GetSilly.svelte"
	import InvisibleA from "./InvisibleA.svelte"
	export let post: Post
</script>

<InvisibleA href={post.path}>
	<Box tag="article" align="start">
		<GetSilly>{post.title}</GetSilly>
		<p>{post.description}</p>
		<time datetime={post.ymd}>{post.ymd}</time>
	</Box>
</InvisibleA>

<style>
	p {
		margin: 0;
		padding: 0;
	}
	time {
		font-style: italic;
	}
</style>
