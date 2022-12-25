#!/usr/bin/env -S deno run -A
const title = prompt("Post title:")
if (!title) throw new Error("No title provided")
const description = prompt("Description of the post:")
if (!description) throw new Error("No description provided")
const date = new Date()
const year = date.getFullYear(),
	month = date.getMonth() + 1,
	day = date.getDate()
const template = Deno.readTextFileSync(new URL("_template.md", import.meta.url))
const nonUrlAndFSSafe = /[^\w\-.~[\]@!&'()+,;=]/g
const slug = title.replace(nonUrlAndFSSafe, "_")
const dir = new URL(`${year}/${month}/${day}/${slug}/`, import.meta.url)
const path = `/posts/${year}/${month}/${day}/${slug}`
Deno.mkdirSync(dir, { recursive: true })
const rep = (s: string, ...rs: [RegExp | string, string][]) => {
	for (const [r, v] of rs) s = s.split(r).join(v)
	return s
}
const pageFile = new URL(`./+page.md`, dir)
Deno.writeTextFileSync(
	pageFile,
	rep(
		template,
		[/{path}/g, path],
		[/{slug}/g, slug],
		[/{title}/g, title],
		[/{description}/g, description],
		[/{date}/g, date.toISOString()],
		[/{ymd}/g, `${year}-${month}-${day}`]
	)
)
Deno.writeTextFileSync(
	new URL("./posts.ts", import.meta.url),
	rep(Deno.readTextFileSync(new URL("./posts.ts", import.meta.url)), [
		"/*begin posts*/",
		"/*begin posts*/\n\t" + JSON.stringify({ slug, title, description, path, date }) + ",",
	])
)

const p = (n: number, len = 2) => n.toString().padStart(len, "0")
// prettier-ignore
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const dateToRSS = (date: Date) =>
	`${days[date.getUTCDay()]}, ${date.getUTCDate()} ${
		months[date.getUTCMonth()]
	} ${date.getUTCFullYear()} ${p(date.getUTCHours())}:${p(date.getUTCMinutes())}:${p(
		date.getUTCSeconds()
	)} +0000`

Deno.writeTextFileSync(
	new URL("../../../static/posts.xml", import.meta.url),
	rep(Deno.readTextFileSync(new URL("../../../static/posts.xml", import.meta.url)), [
		"<!--begin items-->",
		`<!--begin items-->
		<item>
			<title>${title}</title>
			<description>${description}</description>
			<link>https://esthe.live${path}</link>
			<pubDate>${dateToRSS(date)}</pubDate>
		</item>`,
	])
)

console.log("Created post @", await Deno.realPath(pageFile))
