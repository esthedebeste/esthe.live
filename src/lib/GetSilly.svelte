<script lang="ts">
	export let mini = false
</script>

<h1 class:mini><slot /></h1>

<style>
	h1 {
		color: var(--link-color);
		cursor: pointer;
		padding: 0;
		margin: 0;
	}
	.mini {
		font-size: 1.2em;
		word-break: break-all;
	}
	:global(a):visited h1 {
		color: var(--link-visited-color);
	}
	:global(a) h1 {
		transition: transform 175ms ease-in-out;
	}
	:global(a):hover h1 {
		transform: scaleX(130%) translateX(12%);
		text-decoration: underline;
	}
</style>
