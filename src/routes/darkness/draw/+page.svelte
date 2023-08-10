<script lang="ts">
	import { onDestroy, onMount } from "svelte"

	let canvas: HTMLCanvasElement
	$: context = canvas?.getContext("2d")

	interface Point {
		x: number // 0..1
		y: number // 0..1
	}

	interface Path extends Array<Point> {
		0: Point // guarantee start
	}

	let paths: Path[] = []
	let history: Path[][] = [[]]
	let historyIndex = history.length - 1
	let currentPath: Path | undefined
	function down(event: PointerEvent) {
		if (context == null) return
		currentPath = [{ x: event.offsetX / canvas.width, y: event.offsetY / canvas.height }] as Path
	}
	function move(event: PointerEvent) {
		if (context == null || currentPath == null) return
		const current = {
			x: event.offsetX / canvas.width,
			y: event.offsetY / canvas.height,
		}
		currentPath.push(current)
		currentPath = currentPath // trigger reactivity
	}
	function up() {
		if (context == null) return
		if (currentPath != null) {
			paths.push(currentPath)
			history[++historyIndex] = [...paths]
			paths = paths // trigger reactivity
			currentPath = undefined
		}
	}

	$: if (canvas != null) {
		canvas.width = Math.floor(width)
		canvas.height = Math.floor(height)
	}

	function renderPath(
		context: CanvasRenderingContext2D,
		path: Path,
		index: number,
		maxIndex: number
	): number {
		index++
		let previous = path[0]
		for (let pointIndex = 1; pointIndex < path.length; pointIndex++) {
			const point = path[pointIndex]
			const length = Math.hypot(point.x - path[pointIndex - 1].x, point.y - path[pointIndex - 1].y)
			context.beginPath()
			index++
			const age = maxIndex - index
			const angle = Math.atan2(point.y - previous.y, point.x - previous.x)
			const distortedAngle = angle + (Math.random() - 0.5) * (age / 1000)
			const distorted = {
				x: previous.x + Math.cos(distortedAngle) * length,
				y: previous.y + Math.sin(distortedAngle) * length,
			}
			context.moveTo(previous.x * width, previous.y * height)
			context.lineTo(distorted.x * width, distorted.y * height)
			const colorProgress = Math.min(age / 100, 1)
			context.strokeStyle = `rgb(255, ${(1 - colorProgress) * 255}, ${(1 - colorProgress) * 255})`
			context.stroke()
			context.closePath()
			previous = distorted
		}
		return index
	}

	let animation: number
	function render() {
		if (canvas == null || context == null || width == null || height == null) return
		context.clearRect(0, 0, width, height)
		const maxIndex = paths.reduce((sum, path) => sum + path.length, 0) + (currentPath?.length ?? 0)
		let index = 0
		for (const path of paths) index = renderPath(context, path, index, maxIndex)
		if (currentPath != null) index = renderPath(context, currentPath, index, maxIndex)
		requestAnimationFrame(render)
	}

	onMount(() => {
		animation = requestAnimationFrame(render)
	})

	onDestroy(() => {
		if (animation == null) return
		cancelAnimationFrame(animation)
	})

	let width: number
	let height: number
</script>

<canvas
	bind:this={canvas}
	bind:offsetWidth={width}
	bind:offsetHeight={height}
	tabindex="0"
	on:pointerdown={down}
	on:pointerup={up}
	on:pointermove={move}
	on:keydown={event => {
		if (event.target !== canvas) return
		switch (true) {
			case event.ctrlKey && !event.shiftKey && event.code === "KeyC": {
				history[++historyIndex] = []
				paths = []
				break
			}
			case event.ctrlKey && !event.shiftKey && event.code === "KeyZ": {
				if (historyIndex <= 0) break
				const previous = history[--historyIndex]
				if (previous != null) paths = previous
				break
			}
			case event.ctrlKey && event.shiftKey && event.code === "KeyZ": {
				if (historyIndex >= history.length - 1) break
				const next = history[++historyIndex]
				if (next != null) paths = next
				break
			}
		}
	}}
/>

<style>
	:global(body) {
		background: #0e0403;
		overflow: hidden;
	}
	canvas {
		width: 100vw;
		height: 100vh;
		background: transparent;
		touch-action: pinch-zoom;
		overflow: hidden;
	}
</style>
