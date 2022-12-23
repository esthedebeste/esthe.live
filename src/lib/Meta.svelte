<script lang="ts">
	export let title: string
	export let description = "the esthe site :)"
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="description" content={description} />
</svelte:head>
