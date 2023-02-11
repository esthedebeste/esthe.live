<script lang="ts">
	export let tag = "div"
	export let align: "start" | "center" = "center"
	let class_ = ""
	export { class_ as class }
</script>

<svelte:element this={tag} style:align-items={align} class={class_}>
	<slot />
</svelte:element>

<style>
	* {
		margin-left: auto;
		margin-right: auto;
		margin-top: 1em;
		padding: 1em;
		display: flex;
		width: fit-content;
		flex-direction: column;
		background-color: #fff3;
		border-radius: 15px;
		box-shadow: 0 0 1em #fff3;
	}
	/* mobile */
	@media screen and (max-width: 768px) {
		* {
			max-width: 95vw;
			min-width: 75vw;
		}
	}
	/* pc */
	@media screen and (min-width: 768px) {
		* {
			width: 60vw;
		}
	}
</style>
