<script lang="ts">
	import { onMount } from "svelte"
	import frag from "./Space.frag?raw"
	import vert from "./Space.vert?raw"
	let canvas: HTMLCanvasElement
	export let ro = 35 / 255,
		rm = 0.3,
		go = 0,
		gm = 0.1,
		bo = 15 / 255,
		bm = 0.2
	export let scale = 5

	let width = 1080
	let height = 1920
	const goalFps = 24
	const goalFrameTime = 1000 / goalFps

	function createGlShader(gl: WebGLRenderingContext, type: number, glsl: string) {
		let shader = gl.createShader(type)
		if (!shader) throw new Error("no shader")
		gl.shaderSource(shader, glsl)
		gl.compileShader(shader)
		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			console.log(gl.getShaderInfoLog(shader))
			gl.deleteShader(shader)
			throw new Error("shader compile error")
		}
		return shader
	}
	onMount(() => {
		width = window.innerWidth
		height = window.innerHeight
		const gl = canvas.getContext("webgl")
		if (!gl) throw new Error("no webgl")

		const vertShader = createGlShader(gl, gl.VERTEX_SHADER, vert)
		const fragShader = createGlShader(gl, gl.FRAGMENT_SHADER, frag)
		const program = gl.createProgram()
		if (!program) throw new Error("no program")
		gl.attachShader(program, vertShader)
		gl.attachShader(program, fragShader)
		gl.linkProgram(program)
		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			console.error(gl.getProgramInfoLog(program))
			gl.deleteProgram(program)
			throw new Error("program link error")
		}

		const locations = {
			a_position: gl.getAttribLocation(program, "a_position"),
			iTime: gl.getUniformLocation(program, "iTime"),
			iScale: gl.getUniformLocation(program, "iScale"),
			iResolution: gl.getUniformLocation(program, "iResolution"),
			iColorMultiplier: gl.getUniformLocation(program, "iColorMultiplier"),
			iColorOffset: gl.getUniformLocation(program, "iColorOffset"),
		}

		const positionBuffer = gl.createBuffer()
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-4, -4, +4, -4, 0, +4]), gl.STATIC_DRAW)

		let pTime = 0
		let animId = requestAnimationFrame(draw)
		function draw(time: number) {
			animId = requestAnimationFrame(draw)
			if (time - pTime < goalFrameTime) return
			pTime = time
			if (!gl) throw new Error("no webgl")
			const w = width
			const h = height
			gl.viewport(0, 0, w, h)
			gl.useProgram(program)
			gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
			gl.vertexAttribPointer(locations.a_position, 2, gl.FLOAT, false, 0, 0)
			gl.enableVertexAttribArray(locations.a_position)

			gl.uniform1f(locations.iTime, time * 1e-3 * 0.15)
			gl.uniform1f(locations.iScale, scale)
			gl.uniform2f(locations.iResolution, w, h)
			gl.uniform3f(locations.iColorOffset, ro / 255, go / 255, bo / 255)
			gl.uniform3f(locations.iColorMultiplier, rm, gm, bm)

			gl.drawArrays(gl.TRIANGLES, 0, 3)
		}

		return () => cancelAnimationFrame(animId)
	})
</script>

<svelte:window
	on:resize={() => {
		width = window.innerWidth
		height = window.innerHeight
	}}
/>
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
