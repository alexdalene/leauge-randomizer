<script>
	import Tooltip from '$lib/components/Tooltip.svelte';

	import { gsap, ScrollTrigger, ScrollToPlugin } from '$lib/gsap.js';
	import { onMount, afterUpdate } from 'svelte';
	import { fade } from 'svelte/transition';

	onMount(async () => {
		gsap.registerPlugin(ScrollTrigger);

		const buttons = gsap.utils.toArray('.lane-btn');
		const tl = gsap.timeline();

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

	export let data;
	const { champions } = data;
	const lanes = ['all', 'top', 'jungle', 'mid', 'bot', 'support'];

	let selectedLane = null;

	function goBack() {
		selectedLane = null;
	}

	let carousel;
	let selectedChampion;

	function selectLane(lane) {
		selectedLane = lane;
	}

	afterUpdate(() => {
		// Carousel animation
		if (selectedLane && carousel) {
			const championsInLane = champions.filter((champion) =>
				champion.position.includes(selectedLane)
			);

			const randomIndex = Math.floor(Math.random() * championsInLane.length);
			selectedChampion = championsInLane[randomIndex];

			console.log(selectedChampion);

			setTimeout(() => {
				const selectedElement = document.querySelector('#champion-' + selectedChampion.key);
				const position =
					selectedElement.offsetLeft - carousel.offsetWidth / 2 + selectedElement.offsetWidth / 2;

				gsap.to(carousel, {
					scrollTo: { x: position, autoKill: false },
					duration: 5,
					onComplete() {
						gsap.to(selectedElement, {
							border: '2px solid var(--accent)',
							borderRadius: '1rem',
							duration: 0.5,
							ease: 'power2.out'
						});
					}
				});
			}, 1000); // delay of 1000 milliseconds
		}
	});
</script>

<h1>Tilfeldig</h1>

{#if selectedLane}
	<div class="selected-lane" in:fade={{ duration: 200 }}>
		<div class="selected-heading">
			<button on:click={goBack}>BACK</button>
			<img src={'/icons/lane-' + selectedLane + '.svg'} alt="" />
		</div>
		<div class="selected-carousel" bind:this={carousel}>
			{#each [1, 2, 3] as _}
				<!-- Repeat the champions 3 times -->
				{#each champions as champion}
					{#if champion.position.includes(selectedLane)}
						{#if selectedChampion && selectedChampion.key === champion.key}
							<img src={champion.image} alt={champion.name} id={'champion-' + champion.key} />
						{:else}
							<img src={champion.image} alt={champion.name} id={'champion-' + champion.key} />
						{/if}
					{/if}
				{/each}
			{/each}
		</div>
	</div>
{:else}
	<div class="lanes">
		{#each lanes as lane}
			<Tooltip text={lane.toUpperCase()}>
				<button class="lane-btn" on:click={() => selectLane(lane)}>
					<img src={'/icons/lane-' + lane + '.svg'} alt="Icon for lane" />
				</button>
			</Tooltip>
		{/each}
	</div>
{/if}

<style>
	h1 {
		text-transform: uppercase;
		font-size: var(--font-lg);
		position: fixed;
		bottom: 1rem;
		left: 1rem;
	}

	.selected-lane {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
		overflow: hidden;
		gap: 4rem;
	}

	.selected-heading {
		display: flex;
		flex-direction: column;

		& > button {
			background-color: transparent;
			border: none;
			cursor: pointer;
			margin-bottom: 1rem;
			color: var(--text-color);
		}

		& > img {
			object-fit: contain;
			height: 3rem;
		}
	}

	.selected-carousel {
		display: flex;
		overflow-x: scroll;
		max-width: 100%;
		gap: 1rem;
		scroll-snap-type: x mandatory;
		scrollbar-width: none;

		& > img {
			object-fit: contain;
			height: 12rem;
			scroll-snap-align: center;
		}
	}

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
	}
</style>
