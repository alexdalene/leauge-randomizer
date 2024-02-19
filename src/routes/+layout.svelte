<script>
	import { page } from '$app/stores';
	import Loading from '$lib/components/Loading.svelte';
</script>

{#if $page.loading}
	<Loading />
{:else}
	<main>
		<slot />
		<h1>Tilfeldig</h1>
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

	h1 {
		text-transform: uppercase;
		font-size: var(--font-lg);
		position: fixed;
		bottom: 1rem;
		left: 1rem;
	}
</style>
