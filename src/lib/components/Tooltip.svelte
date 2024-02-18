<script>
	export let text = '';
</script>

<span class="tooltip">
	<slot />
	<span class="tooltiptext">{text}</span>
</span>

<style>
	.tooltip {
		position: relative;
		display: inline-block;
		cursor: pointer;
	}

	.tooltip .tooltiptext {
		visibility: hidden;
		width: 120px;
		text-align: center;
		font-size: var(--font-sm);
		padding: 5px 0;
		border-radius: 6px;

		position: absolute;
		z-index: 1;
		bottom: 125%;
		left: 50%;
		margin-left: -60px;

		opacity: 0;
		transform: translateY(100%);
		transition: all 200ms ease-in-out;
	}

	.tooltip:hover .tooltiptext {
		visibility: visible;
		opacity: 1;
		transform: translateY(0);
	}
</style>
