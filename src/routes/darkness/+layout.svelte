<script lang="ts">
	import { onDestroy } from "svelte"

	if (typeof document !== "undefined") {
		document.body.dataset.darkness = "true"
		onDestroy(() => {
			delete document.body.dataset.darkness
		})
	}
</script>

<!-- for :has() selectors -->
<darkness hidden />
<slot />