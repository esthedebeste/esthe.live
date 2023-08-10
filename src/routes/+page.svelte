<script lang="ts">
	import Age from "$lib/Age.svelte"
	import Box from "$lib/Box.svelte"
	import LittleShadow from "$lib/LittleShadow.svelte"
	import Meta from "$lib/Meta.svelte"
	import Post from "$lib/Post.svelte"
	import InvisibleA from "../lib/InvisibleA.svelte"
	import Mini from "../lib/Mini.svelte"
	import { has } from "../lib/utils.js"
	import { minis } from "./minis/minis.js"
	import { posts } from "./posts/posts.js"

	const mixed = [...posts, ...minis]
	mixed.sort((a, b) => b.date.getTime() - a.date.getTime())
</script>

<Meta
	title="esthe.live!!!! whoahhh!!"
	description="esthedebeste's little homepage :3"
	type="profile"
>
	<meta property="profile:first_name" content="esthe" />
	<meta property="profile:last_name" content="de beste" />
	<meta property="profile:username" content="esthedebeste" />
	<meta property="profile:gender" content="female" />
</Meta>

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
				<a href="https://github.com/esthedebeste/65536">65536</a> (a 2048 clone i made)
			</li>
			<li>
				a <a href="https://wfc-live.esthe.live/">demo of wave function collapsing</a> i built
			</li>
			<li>my twitch!!!!!! my twitter!!!!!! my rss feed!!!!!! my mastodon!!!!!! EVERYTHING!!!</li>
		</ul>
	</Box>
</main>

<h1>latest posts & minis :3</h1>

{#each mixed as thing}
	{#if has(thing, "slug")}
		<Post post={thing} />
	{:else}
		<InvisibleA href={`/minis/${thing.uuid}`}>
			<Mini preview mini={thing} />
		</InvisibleA>
	{/if}
{/each}

<style>
	h1,
	h2 {
		padding: 0;
		margin: 0;
	}
	span.pronouns {
		color: #f0f;
		text-shadow:
			0 0 0.5em #000,
			0 0 0.5em #0003;
	}
</style>
