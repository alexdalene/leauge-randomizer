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
	<title>TILFELDIG | A simple Leauge of Legends champion randomizer</title>
	<meta
		name="description"
		content="Not sure who to play next? Don't worry. You can find your next champion here on Tilfeldig - A simple Leage of Legends champion randomizer."
	/>
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

<section>
	<h1>Tilfeldig</h1>
	<span>v0.0.3</span>
	<p>
		TILFELDIG is not endorsed by Riot Games and does not reflect the views or opinions of Riot Games
		or anyone officially involved in producing or managing Riot Games properties. Riot Games and all
		associated properties are trademarks or registered trademarks of Riot Games, Inc
	</p>
</section>

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

	section {
		display: flex;
		gap: 0.5rem;
		flex-direction: column;
		align-items: center;
		max-width: 486px;
		position: absolute;
		bottom: 0;
		margin-bottom: 2rem;

		& h1 {
			text-transform: uppercase;
			font-size: var(--font-lg);
			margin-bottom: -0.5rem;
		}

		& span,
		p {
			font-size: var(--font-sm);
		}

		& p {
			text-align: center;
			opacity: 0.4;
		}
	}
</style>
