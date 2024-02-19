<script>
	import { gsap } from '$lib/gsap.js';
	import { onMount } from 'svelte';

	onMount(() => {
		const tl = gsap.timeline();

		tl.to('svg', {
			rotate: 360,
			duration: 1,
			repeat: -1,
			ease: 'none'
		}).to(
			'#path',
			{
				scale: 1.5,
				transformOrigin: 'center',
				duration: 1,
				repeat: -1,
				yoyo: true,
				ease: 'power1.inOut'
			},
			'<'
		);
	});
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"
	><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
		id="path"
		d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"
	/></svg
>

<style>
	svg {
		width: 2rem;
		height: 2rem;
		margin: auto;
		display: block;
		color: var(--primary);
	}
</style>
