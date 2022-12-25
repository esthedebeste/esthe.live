<script lang="ts">
	export let href: string
</script>

<a {href}><slot /></a>

<style>
	a,
	a:visited,
	a:hover {
		color: inherit;
		text-decoration: none;
	}
</style>
