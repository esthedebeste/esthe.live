<script lang="ts">
	export let title: string
	export let description = "the esthe site :)"
	export let type: "article" | "website" = "website"
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content={type} />
	<meta name="description" content={description} />
</svelte:head>
