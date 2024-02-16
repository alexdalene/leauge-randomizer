<script>
	import { page } from '$app/stores';
</script>

{#if $page.loading}
	<div>Loading...</div>
{:else}
	<main>
		<slot />
	</main>
{/if}

<style>
	main {
		min-height: 100svh;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
