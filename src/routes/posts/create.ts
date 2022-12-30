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
	new URL("./posts.json", import.meta.url),
	JSON.stringify([
		{ slug, title, description, path, date },
		...JSON.parse(Deno.readTextFileSync(new URL("./posts.json", import.meta.url))),
	])
)

console.log("Created post @", await Deno.realPath(pageFile))
