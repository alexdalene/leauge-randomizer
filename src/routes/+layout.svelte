<script>
	import { page } from '$app/stores';
	import Loading from '$lib/components/Loading.svelte';
</script>

{#if $page.loading}
	<Loading />
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
		flex-direction: column;
	}
</style>
