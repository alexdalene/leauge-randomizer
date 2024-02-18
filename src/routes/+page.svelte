<script>
	import Tooltip from '$lib/components/Tooltip.svelte';

	import { gsap, ScrollTrigger, ScrollToPlugin } from '$lib/gsap.js';
	import { onMount, afterUpdate } from 'svelte';
	import { fade } from 'svelte/transition';

	onMount(async () => {
		gsap.registerPlugin(ScrollTrigger);

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

	export let data;
	const { champions } = data;
	const lanes = ['all', 'top', 'jungle', 'mid', 'bot', 'support'];

	let selectedLane = null;

	function goBack() {
		selectedLane = null;
	}

	let carousel;
	let selectedChampion;
	let championName;

	function selectLane(lane) {
		selectedLane = lane;
	}

	function retry() {
		selectedChampion = null;
		carousel.scrollTo({ left: 0, behavior: 'smooth' });
	}

	afterUpdate(() => {
		if (selectedLane && carousel) {
			let championsInLane;

			if (selectedLane === 'all') {
				championsInLane = champions;
			} else {
				championsInLane = champions.filter((champion) => champion.position.includes(selectedLane));
			}

			const randomIndex = Math.floor(Math.random() * championsInLane.length);
			selectedChampion = championsInLane[randomIndex];

			championName = selectedChampion.name.replace(/\s+/g, '');

			if (championName === 'Wukong') {
				championName = 'MonkeyKing';
			}

			setTimeout(() => {
				const tl = gsap.timeline();
				const selectedElement = document.querySelector('#champion-' + selectedChampion.key);
				const position =
					selectedElement.getBoundingClientRect().left -
					carousel.getBoundingClientRect().left +
					carousel.scrollLeft -
					carousel.clientWidth / 2 +
					selectedElement.clientWidth / 2;

				gsap.to(carousel, {
					scrollTo: { x: position, autoKill: false },
					duration: 5,
					onComplete() {
						tl.to(selectedElement, {
							height: '15rem',
							duration: 0.5,
							ease: 'power2.out'
						})
							.to('.selected-info', {
								opacity: 1,
								duration: 0.5,
								ease: 'power2.out'
							})
							.to(
								'.background-image',
								{
									opacity: 0.5,
									duration: 0.5,
									ease: 'power2.out'
								},
								'-=0.5'
							);
					}
				});
			}, 1000);
		}
	});
</script>

<h1>Tilfeldig</h1>

{#if selectedLane}
	<div class="selected-lane" in:fade={{ duration: 200 }}>
		<div class="selected-heading">
			<Tooltip text="Back">
				<button on:click={goBack}
					><svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 448 512"
						class="svg"
						fill="currentColor"
						><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
							id="path-1"
							d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
						/></svg
					></button
				>
			</Tooltip>
			<img src={'/icons/lane-' + selectedLane + '.svg'} alt="" />

			<Tooltip text="Retry">
				<button on:click={retry}
					><svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
						class="svg"
						fill="currentColor"
						><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
							d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z"
						/></svg
					></button
				>
			</Tooltip>
		</div>
		<div class="selected-carousel" bind:this={carousel}>
			{#each [1, 2, 3] as repeatIndex}
				<!-- Repeat the champions 3 times -->
				{#each champions as champion}
					{#if selectedLane === 'all' || champion.position.includes(selectedLane)}
						{#if selectedChampion && selectedChampion.key === champion.key && repeatIndex === 3}
							<div>
								<img src={champion.image} alt={champion.name} id={'champion-' + champion.key} />
								<div class="selected-info">
									<h2>{champion.name}</h2>
									<a
										target="_blank"
										href={`https://u.gg/lol/champions/${champion.name.toLowerCase()}/build/${selectedLane}`}
										>Build</a
									>
								</div>
							</div>
						{:else}
							<div>
								<img
									src={champion.image}
									alt={champion.name}
									id={repeatIndex === 3 ? 'champion-' + champion.key : ''}
								/>
							</div>
						{/if}
					{/if}
				{/each}
			{/each}
		</div>
		{#if selectedChampion}
			<div
				class="background-image"
				style={'background-image: url(/splash/' + championName + '_0.jpg)'}
			></div>
		{/if}
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
		min-height: 100svh;
		width: 100%;
		overflow: hidden;
		gap: 4rem;
	}

	.background-image {
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		position: fixed;
		inset: 0;
		z-index: -1;
		opacity: 0;
	}

	.selected-heading {
		display: flex;
		align-items: center;
		gap: 1rem;

		& button {
			background-color: transparent;
			border: none;
			border-radius: 0.5rem;
			padding: 0.5rem 1rem;
			cursor: pointer;
			color: var(--text-color);
			text-transform: uppercase;
			font-weight: 600;
			display: flex;
			align-items: center;
			gap: 0.5rem;
			transition: background-color 200ms ease-in-out;

			& .svg {
				height: auto;
				width: 1rem;
				color: var(--text-color);
			}

			&:hover {
				background-color: var(--secondary);
			}
		}

		& img {
			object-fit: contain;
			height: 2rem;
		}
	}

	.selected-carousel {
		display: flex;
		overflow-x: scroll;
		width: 100%;
		max-width: 768px;
		gap: 1rem;
		scroll-snap-type: x mandatory;
		scrollbar-width: none;
		align-items: flex-start;
		mask-image: linear-gradient(
			to right,
			transparent,
			var(--background) 10%,
			var(--background) 90%,
			transparent
		);
		scroll-margin-inline: 50%;

		& > div {
			scroll-snap-align: center;
			height: fit-content;
			width: max-content;
		}

		& > div > img {
			object-fit: contain;
			height: 12rem;
			width: auto;
		}
	}

	.selected-info {
		opacity: 0;
		/* height: 6rem; */
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;

		& > h2 {
			font-size: var(--font-xl);
			text-align: center;
		}

		& > a {
			background-color: var(--accent);
			color: var(--text-color);
			padding: 0.5rem 1rem;
			border-radius: 0.5rem;
			text-decoration: none;
			text-transform: uppercase;
			font-weight: 600;
			transition: background-color 0.2s;

			&:hover {
				background-color: var(--secondary);
			}
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
