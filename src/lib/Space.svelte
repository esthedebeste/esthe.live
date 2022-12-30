<script lang="ts">
	import { onMount } from "svelte"
	import { createNoise3D } from "simplex-noise"

	const noise = createNoise3D()
	let canvas: HTMLCanvasElement
	let ctx: CanvasRenderingContext2D | null
	let frameTime = 1
	let showFps = false
	;(globalThis as unknown as { showFps: () => boolean }).showFps = () => (showFps = !showFps)
	let width = 1080
	let height = 1920
	const wslog = Math.log2(2560)
	$: logwsw = Math.log2(width) / wslog
	$: resScalar = Math.round((6 * width) / 2560)
	$: noiseScalar = (750 / resScalar) * logwsw
	export let ro = 0,
		rm = 10,
		go = 0,
		gm = 10,
		bo = 0,
		bm = 10
	let pTime = 0
	const goalFps = 15
	const goalFrameTime = 1000 / goalFps
	let animId: number | null = null
	function render(time: number) {
		animId = requestAnimationFrame(render)
		if (time - pTime < goalFrameTime) return
		if (!ctx) return
		pTime = time
		const w = width,
			h = height
		const t = time / 10000
		const imgdata = ctx.getImageData(0, 0, w, h)
		const data = imgdata.data
		for (let x = 0; x < w / resScalar; x++)
			for (let y = 0; y < h / resScalar; y++) {
				let g = noise(x / noiseScalar, y / noiseScalar, t) * 0.5 + 0.5
				for (let ax = 0; ax < resScalar; ax++)
					for (let ay = 0; ay < resScalar; ay++) {
						const i = (x * resScalar + ax + (y * resScalar + ay) * w) * 4
						data[i] = g * rm + ro
						data[i + 1] = g * gm + go
						data[i + 2] = g * bm + bo
						data[i + 3] = 255
					}
			}
		ctx.putImageData(imgdata, 0, 0)
		if (showFps) frameTime = performance.now() - time
	}
	onMount(() => {
		width = innerWidth
		height = innerHeight
		ctx = canvas.getContext("2d")
		animId = requestAnimationFrame(render)
		return () => {
			if (animId != null) cancelAnimationFrame(animId)
		}
	})
</script>

<svelte:window
	on:resize={() => {
		width = window.innerWidth
		height = window.innerHeight
		ctx = canvas.getContext("2d")
	}}
/>

{#if showFps}
	Frametime: {frameTime.toFixed(0)}ms (running at {#if frameTime < goalFrameTime}{goalFps}{:else}{(
			1000 / frameTime
		).toPrecision(3)}{/if}fps)
{/if}
<canvas bind:this={canvas} {width} {height} aria-hidden="true" />

<style>
	canvas {
		position: fixed;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		z-index: -1;
	}
</style>
