#!/usr/bin/env -S deno run -A
import { timingSafeEqual } from "https://deno.land/std@0.197.0/crypto/timing_safe_equal.ts"
import * as base64url from "https://deno.land/std@0.197.0/encoding/base64url.ts"
import * as path from "https://deno.land/std@0.197.0/path/mod.ts"
import { Application, Router } from "https://deno.land/x/oak@v12.6.0/mod.ts"
import type { RawMini } from "./minis.ts"
const minisPath = path.resolve(path.fromFileUrl(new URL("./minis.json", import.meta.url)))
export async function createMini(text: string) {
	const minis = JSON.parse(await Deno.readTextFile(minisPath)) as RawMini[]
	const uuid = crypto.randomUUID()
	const date = new Date()
	const mini = {
		mini_uuid: uuid,
		date: date.toISOString(),
		text,
	} satisfies RawMini
	minis.push(mini)
	await Deno.writeTextFile(minisPath, JSON.stringify(minis, null, "\t"))

	for (const args of [
		["add", minisPath],
		["commit", "-m", `mini ${uuid}`, "--no-gpg-sign"],
		["push"],
	]) {
		const status = await new Deno.Command("git", { args: args, stdin: "null" }).spawn().status
		if (!status.success) throw new Error(`git ${args[0]} failed`)
	}
}

const { B64URL_PASSWORD, SALT } = JSON.parse(
	await Deno.readTextFile(new URL("./node_modules", import.meta.url))
)
if (B64URL_PASSWORD == null) throw new Error("MINIS_ADMIN_PASSWORD not set")
if (SALT == null) throw new Error("MINIS_ADMIN_PASSWORD_SALT not set")
const HASHED_PASSWORD = base64url.decode(B64URL_PASSWORD)
export async function checkPassword(password: string) {
	const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(password + SALT))
	return timingSafeEqual(hash, HASHED_PASSWORD)
}

const app = new Application()
const router = new Router()

router
	.get("/", ctx => {
		ctx.response.status = 200
		ctx.response.type = "text/html"
		ctx.response.body = `<!doctype html>
<html lang=en>
<meta charset=UTF-8>
<title>esthe.live minis admin panel</title>
<style>
html {
    background: #220018;
    color: #fff;
}
#password{
    -webkit-text-security: disc;
}
</style>
<h1>esthe.live minis admin panel</h1>
<form action=/minis method=post>
    <label>mini text content <input name=text size=10000 required></label>
    <label>password <input id=password name=password autocomplete=current-password required></label>
    <button>submit</button>
</form>`
	})
	.post("/minis", async ctx => {
		const body = ctx.request.body()
		if (body.type !== "form") {
			ctx.response.status = 400
			ctx.response.body = "use the form"
			return
		}
		const form = await body.value
		const text = form.get("text")
		const password = form.get("password")
		if (typeof text !== "string" || typeof password !== "string") {
			ctx.response.status = 400
			ctx.response.body = "text and password are required"
			return
		}
		if (!(await checkPassword(password))) {
			ctx.response.status = 403
			ctx.response.body = "wrong password"
			return
		}

		try {
			await createMini(text)
		} catch (error) {
			ctx.response.status = 500
			if (error instanceof Error) ctx.response.body = error.stack ?? String(error)
			else ctx.response.body = error
			return
		}
		ctx.response.status = 201
	})
app.use(router.routes())
app.use(router.allowedMethods())
app.addEventListener("listen", event =>
	console.log(`listening on http://${event.hostname}:${event.port}`)
)
await app.listen({ port: 13078, hostname: "0.0.0.0" })
