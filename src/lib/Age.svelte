<script lang="ts">
	import LittleShadow from "./LittleShadow.svelte"

	let millis = new Date().getTime() - new Date("17 October 2006").getTime()
	let years = Math.floor(millis / 1000 / 60 / 60 / 24 / 365)
</script>

<LittleShadow>{years}</LittleShadow>
