<script lang="ts">
	import { onMount } from "svelte"
	import data, { type Choices, type Text } from "./branches"

	interface Message {
		time: string
		sender: string
		text: string
	}

	const has = Function.prototype.call.bind(Object.prototype.hasOwnProperty) as <T>(
		object: unknown,
		key: keyof T
	) => object is T

	let randomizer = -1
	let branches: Choices = data[1]
	$: choices = Object.keys(branches)
	let form: HTMLFormElement
	let buttons: HTMLButtonElement[] = []
	const timeFormat = new Intl.DateTimeFormat(undefined, {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		fractionalSecondDigits: 3,
	})
	const time = () => timeFormat.format(new Date())
	const startTimes = [time(), time(), time()]
	startTimes.sort()
	let buttonQ: HTMLButtonElement
	let messages: Message[] = []
	let disabled = false

	const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
	async function randomize() {
		disabled = true
		const to = Math.floor(20 + Math.random() * (choices.length + 1))
		for (let i = 0; i <= to; i++) {
			randomizer = i % (choices.length + 1)
			await sleep(i * (20 + Math.random() * 10))
		}
		form.requestSubmit(randomizer === choices.length ? buttonQ : buttons[randomizer])
		randomizer = -1
		disabled = false
	}

	async function type(...texts: Text[]) {
		disabled = true
		for (const { sender, text } of texts) {
			const msg = { time: time(), sender, text: "" }
			messages.push(msg)
			messages = messages // notify svelte of change
			for (const char of text) {
				msg.time = time()
				msg.text += char
				messages = messages // notify svelte of change
				if (char !== " ") await sleep(70 + Math.random() * 30)
			}
		}
		disabled = false
	}

	async function submit(event: SubmitEvent) {
		const { submitter } = event
		submitter?.blur()
		if (submitter === buttonQ) {
			randomize()
			return
		}
		const optionIndex = Number(submitter?.dataset.option)
		const chosenText = choices[optionIndex]
		const [responses, future] = branches[chosenText]
		console.log(
			"option",
			String.fromCharCode("A".charCodeAt(0) + optionIndex),
			"was selected -",
			JSON.stringify(chosenText)
		)
		await type({
			sender: "player",
			text: chosenText,
		})
		await sleep(500 + Math.random() * 50) // todo animation?
		await type(...responses)
		if (has(future, "ENDING")) {
			console.log(`Ending! ${JSON.stringify(future)}`)
			branches = {}
		} else branches = future
	}

	onMount(() => {
		type(...data[0])
	})
</script>

<main>
	<ul>
		{#each messages as message (message)}
			<li><time>{message.time}</time><span class={message.sender}>{message.text}</span></li>
		{/each}
	</ul>
	<form on:submit|preventDefault={submit} bind:this={form}>
		{#each choices as text, i}
			<button class:focus={randomizer === i} {disabled} data-option={i} bind:this={buttons[i]}
				>{text}</button
			>
		{/each}
		<button class:focus={randomizer === choices.length} {disabled} bind:this={buttonQ}>?</button>
	</form>
</main>

<style>
	main {
		font-family: "Times New Roman", serif;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		padding: 1vmin;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	ul {
		display: table;
		border-collapse: collapse;
		list-style-type: none;
		margin: 0;
		padding: 0;
	}
	li {
		display: table-row;
		border: 1px solid white;
		padding-bottom: 3px;
		background-color: #fff1;
		flex-direction: row;
		gap: 1ch;
	}
	time {
		display: table-cell;
		white-space: nowrap;
		width: 0;
		font-family: monospace;
		font-weight: 100;
		background: black;
		padding-right: 0.5ch;
		border-right: 1px solid white;
	}
	span {
		display: table-cell;
		padding-left: 0.5ch;
	}
	.narrator {
		color: #0ef;
	}
	.player {
		color: #fff;
	}
	.umbra {
		color: #900;
	}
	form {
		display: flex;
		justify-content: space-around;
	}
	button {
		background: black;
		font-family: inherit;
		border: white 1px solid;
		color: white;
		font-size: 3vw;
		padding: 1vw;
	}
	button:focus,
	button:hover,
	button.focus {
		background: darkred;
		color: black;
		outline: none;
	}
</style>
