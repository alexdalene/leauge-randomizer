<script>
	import { page } from '$app/stores';
	import Loading from '$lib/components/Loading.svelte';
</script>

{#if $page.loading}
	<Loading />
{:else}
	<slot />
{/if}
