export type Post = {
	slug: string
	title: string
	description: string
	path: string
	date: Date
	ymd: string
}

import rawPosts from "./posts.json"

export const posts: Post[] = rawPosts.map((p) => ({
	...p,
	date: new Date(p.date),
	ymd: p.date.split("T")[0],
}))
