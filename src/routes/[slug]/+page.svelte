<script>
	import { page } from '$app/stores';
	import { afterUpdate } from 'svelte';
	import { gsap } from '$lib/gsap.js';
	import { fade } from 'svelte/transition';

	import Tooltip from '$lib/components/Tooltip.svelte';

	export let data;
	const { champions } = data;

	const selectedLane = $page.params.slug;

	let carousel;
	let selectedChampion;
	let championName;

	let tl;
	let isTimelineComplete = false;

	afterUpdate(() => {
		if (selectedLane && carousel && !tl) {
			const randomIndex = Math.floor(Math.random() * champions.length);
			selectedChampion = champions[randomIndex];

			championName = selectedChampion.id;

			setTimeout(() => {
				tl = gsap.timeline({
					onComplete: () => {
						isTimelineComplete = true;
					}
				});

				const selectedElement = document.querySelector('#champion-' + selectedChampion.key);
				const position =
					selectedElement.getBoundingClientRect().left -
					carousel.getBoundingClientRect().left +
					carousel.scrollLeft -
					carousel.clientWidth / 2 +
					selectedElement.clientWidth / 2;

				tl.to(carousel, {
					scrollTo: { x: position, autoKill: false },
					duration: 5,
					ease: 'power2.out'
				})
					.to(selectedElement, {
						height: '15rem',
						duration: 0.5,
						ease: 'power2.out'
					})
					.to('.selected-champion', {
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
			}, 500);
		}
	});

	function retry() {
		// // Set isTimelineComplete to false when retrying
		isTimelineComplete = false;
		selectedChampion = null;
		tl.restart();
		tl = null;
	}
</script>

<svelte:head>
	<title>TILFELDIG | Browsing {selectedLane} lane</title>
	<meta
		name="description"
		content="Browse through the champions for the {selectedLane} lane on Tilfeldig - A simple Leage of Legends champion randomizer."
	/>
</svelte:head>

<div class="container">
	<div class="heading">
		<Tooltip text="Back">
			<a href="/" aria-label="Back to home"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 448 512"
					class="svg"
					fill="currentColor"
					><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
						id="path-1"
						d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
					/></svg
				></a
			>
		</Tooltip>

		<div class="title">
			<h1>{selectedLane}</h1>
			<img src={'/icons/lane-' + selectedLane + '.svg'} alt="" />
		</div>

		{#if isTimelineComplete}
			<Tooltip text="Retry">
				<button on:click={retry} type="button" in:fade={{ duration: 200 }} aria-label="Retry"
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
		{:else}
			<button disabled aria-hidden="true" type="button"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
					class="svg"
					fill="transparent"
					><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
						d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z"
					/></svg
				></button
			>
		{/if}
	</div>
	<div class="carousel" bind:this={carousel}>
		{#each [1, 2, 3] as repeatIndex}
			<!-- Repeat the champions 3 times -->
			{#each champions as champion}
				{#if selectedChampion && selectedChampion.key === champion.key && repeatIndex === 2}
					<div>
						<img
							src={champion.image}
							alt={champion.name}
							id={'champion-' + champion.key}
							width="192"
							height="192"
						/>
						<div class="selected-champion">
							<h2>{champion.name}</h2>
							<a
								target="_blank"
								aria-label="View build on u.gg"
								href={`https://u.gg/lol/champions/${champion.name.toLowerCase()}/build/${selectedLane}`}
								>Build</a
							>
						</div>
					</div>
				{:else}
					<div>
						<img src={champion.image} alt={champion.name} width="192" height="192" />
					</div>
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

<style>
	.container {
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

	.heading {
		display: flex;
		align-items: center;
		gap: 1rem;

		& a,
		button {
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

		& .title {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 0.5rem;

			& h1 {
				font-size: var(--font-lg);
				text-transform: uppercase;
			}
		}
	}

	.carousel {
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

		&::-webkit-scrollbar {
			display: none;
		}

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

		& .placeholder {
			visibility: hidden;
		}
	}

	.selected-champion {
		opacity: 0;
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
</style>
