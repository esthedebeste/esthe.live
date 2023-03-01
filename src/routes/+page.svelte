<script lang="ts">
	import Box from "$lib/Box.svelte"
	import Meta from "$lib/Meta.svelte"
	import Post from "$lib/Post.svelte"
	import Age from "../lib/Age.svelte"
	import LittleShadow from "../lib/LittleShadow.svelte"
	import { posts } from "./posts/posts.js"
</script>

<Meta title="esthe.live!!!! whoahhh" />

<main>
	<Box>
		<h1>HIII!!!</h1>
		<p>
			welcome to the esthe page :3<br />
			my socials are at the bottom of the page (as well as my rss feed⁉️⁉️⁉️) so feel free to follow
			:)
			<br />
			i'm going to use this site to post about my projects and stuff, so if you're interested in that,
			you can subscribe to the rss feed! <br />
			site made with sveltekit :D (source code is on
			<a href="https://github.com/esthedebeste/esthe-live">github</a>)
		</p>
	</Box>
	<Box align="start">
		<h2>about me :3</h2>

		<p>
			hi! i'm <LittleShadow>esthedebeste</LittleShadow> :3 my pronouns are
			<span class="pronouns">she/xe</span>
			& i'm a <Age /> year old teenager from the netherlands :3 i'm a little bit of a
			<LittleShadow>programmer</LittleShadow> & i like to make things :3
		</p>

		<h3>feel free to check out</h3>
		<ul>
			<li>
				<a href="https://github.com/esthedebeste/chatties">chatties</a> (a twitch chat client i made)
			</li>
			<li>
				<a href="https://github.com/esthedebeste/65536>">65536</a> (a 2048 clone i made)
			</li>
			<li>
				<details>
					<summary>
						a <a href="https://wfc.esthe.live/#3">demo of wave function collapsing</a> i built a while
						ago :)
					</summary>
					(it generates pixelart based on rules like "green is not allowed to the right of green", "yellow
					is not allowed above green", etc.)
				</details>
			</li>
			<li>my twitch!!!!!! my twitter!!!!!! my rss feed!!!!!! my mastodon!!!!!! EVERYTHING!!!</li>
		</ul>
	</Box>
</main>

<h1>latest blog posts :3</h1>

{#each posts as post}
	<Post {post} />
{/each}

<style>
	h1,
	h2 {
		padding: 0;
		margin: 0;
	}
	span.pronouns {
		color: #aa00aa;
	}
	details {
		font-size: 0.7em;
	}
	summary {
		font-size: calc(1em / 0.7);
		cursor: pointer;
	}
	li > details {
		transform: translateX(-2ch);
	}
</style>
