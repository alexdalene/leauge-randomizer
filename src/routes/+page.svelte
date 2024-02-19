<script>
	import Tooltip from '$lib/components/Tooltip.svelte';

	import { gsap } from '$lib/gsap.js';
	import { onMount } from 'svelte';

	onMount(async () => {
		const tl = gsap.timeline();
		const buttons = gsap.utils.toArray('.lane-btn');

		tl.from(buttons, {
			opacity: 0,
			y: 20,
			stagger: 0.1,
			duration: 0.5,
			ease: 'power2.out'
		}).to(
			buttons,
			{
				opacity: 0.5,
				y: 0,
				stagger: 0.1,
				duration: 0.5,
				ease: 'power2.out'
			},
			'-=0.6'
		);

		buttons.forEach((button) => {
			button.addEventListener('mouseover', () => {
				gsap.to(button, { opacity: 1, duration: 0.2 });
			});
			button.addEventListener('mouseout', () => {
				gsap.to(button, { opacity: 0.5, duration: 0.2 });
			});
		});
	});

	const lanes = ['all', 'top', 'jungle', 'mid', 'bot', 'support'];

	function selectLane(lane) {
		location.href = `/${lane}`;
	}
</script>

<svelte:head>
	<title>Tilfeldig</title>
	<meta name="description" content="Get a random Leauge of Legends champion for your next match!" />
</svelte:head>

<div class="lanes">
	{#each lanes as lane}
		<Tooltip text={lane.toUpperCase()}>
			<button class="lane-btn" on:click={() => selectLane(lane)}>
				<img src={'/icons/lane-' + lane + '.svg'} alt="Icon for lane" />
			</button>
		</Tooltip>
	{/each}
</div>

<style>
	.lanes {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: 2rem;

		& .lane-btn {
			background-color: transparent;
			border: none;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			width: fit-content;
			padding: 0.5rem;

			& > img {
				object-fit: contain;
				height: 2rem;
			}
		}

		@media (max-width: 768px) {
			grid-template-rows: repeat(6, 1fr);
			grid-template-columns: 1fr;
		}
	}
</style>
