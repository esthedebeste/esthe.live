import adapter from "@sveltejs/adapter-static"
import { vitePreprocess } from "@sveltejs/kit/vite"
import { readFileSync, writeFileSync } from "fs"
import { readdir } from "fs/promises"
import { mdsvex } from "mdsvex"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"

const p = (n, len = 2) => n.toString().padStart(len, "0")
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const dateToRSS = date =>
	`${days[date.getUTCDay()]}, ${date.getUTCDate()} ${
		months[date.getUTCMonth()]
	} ${date.getUTCFullYear()} ${p(date.getUTCHours())}:${p(date.getUTCMinutes())}:${p(
		date.getUTCSeconds()
	)} +0000`

async function lsRecursive(dir) {
	const dirents = await readdir(dir, { withFileTypes: true })
	const files = await Promise.all(
		dirents.map(dirent => {
			const path = dir + "/" + dirent.name
			return dirent.isDirectory() ? lsRecursive(path) : path
		})
	)
	return files.flat(Infinity)
}
/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: [".md"],
			remarkPlugins: [remarkGfm],
			rehypePlugins: [rehypeSlug],
		}),
	],
	kit: {
		adapter: {
			name: "@sveltejs/adapter-static + rss generation",
			async adapt(builder) {
				await adapter({ pages: "build", fallback: "404.html" }).adapt(builder)

				// create /posts.rss
				/** @type {import("./src/routes/posts/posts.json")} */
				const posts = JSON.parse(readFileSync("./src/routes/posts/posts.json", "utf8"))
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
						.replace(/ class="svelte-.*?"/g, "") // remove svelte classes because we're not sending css anyway
						.replace(/<!--.*?-->/gs, "") // remove comments
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

				// create /sitemap.txt
				const files = await lsRecursive("build")
				const sitemap = files
					.filter(f => f.endsWith(".html") && !f.endsWith("404.html"))
					.map(f => f.replace("build", "https://esthe.live"))
					.map(f => f.replace(/index\.html$/, ""))
					.join("\n")
				writeFileSync("build/sitemap.txt", sitemap)
			},
		},
		appDir: "_silly", // silly
	},
	extensions: [".svelte", ".md"],
	compilerOptions: {
		sourcemap: true,
		preserveComments: true,
	},
}

export default config
