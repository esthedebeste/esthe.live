export type Post = {
	slug: string
	title: string
	description: string
	path: string
	date: Date
	ymd: string
}

export const posts: Post[] = [
	/*begin posts*/
	{
		slug: "hii__3",
		title: "hii :3",
		description: "first post!!!",
		path: "/posts/2022/12/25/hii__3",
		date: "2022-12-25T13:42:22.000Z",
	},
].map((p) => ({ ...p, date: new Date(p.date), ymd: p.date.split("T")[0] }))
