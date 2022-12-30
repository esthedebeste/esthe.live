import adapter from "@sveltejs/adapter-static"
import { vitePreprocess } from "@sveltejs/kit/vite"
import { mdsvex } from "mdsvex"
import { readFileSync, writeFileSync } from "fs"

const p = (n, len = 2) => n.toString().padStart(len, "0")
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const dateToRSS = (date) =>
	`${days[date.getUTCDay()]}, ${date.getUTCDate()} ${
		months[date.getUTCMonth()]
	} ${date.getUTCFullYear()} ${p(date.getUTCHours())}:${p(date.getUTCMinutes())}:${p(
		date.getUTCSeconds()
	)} +0000`

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess(), mdsvex({ extensions: [".md"] })],
	kit: {
		adapter: {
			name: "@sveltejs/adapter-static + rss generation",
			async adapt(builder) {
				await adapter({ pages: "build", fallback: "404.html" }).adapt(builder)
				/** @type {import("./src/routes/posts/posts.json")} */
				const posts = JSON.parse(readFileSync("./src/routes/posts/posts.json", "utf8"))
				// construct posts.rss
				let contents = `\
<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>esthe!</title>
		<link>https://esthe.live</link>
		<atom:link href="https://esthe.live/posts.rss" rel="self" />
		<description>esthe's site / blog</description>`
				for (const post of posts) {
					const content = readFileSync("build" + post.path + ".html", "utf8")
						.match(/<main.*?>(.*?)\s*<a href="\/"/s)[1] // get the main content until the "back to homepage" link
						.replace('href="/', 'href="https://esthe.live/') // fix links to be absolute
						.replace('src="/', 'src="https://esthe.live/')
						.replace(/ class=".*?"/, "") // remove classes because we're not sending css anyway
					contents += `
		<item>
			<title>${post.title}</title>
			<description>${post.description}</description>
			<link>https://esthe.live${post.path}</link>
			<pubDate>${dateToRSS(new Date(post.date))}</pubDate>
			<guid isPermaLink="true">https://esthe.live${post.path}</guid>
			<content:encoded><![CDATA[${content}]]></content:encoded>
		</item>`
				}
				contents += `
	</channel>
</rss>`
				writeFileSync("build/posts.rss", contents)
			},
		},
	},
	extensions: [".svelte", ".md"],
	compilerOptions: {
		sourcemap: true,
	},
}

export default config
