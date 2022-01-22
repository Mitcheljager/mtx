<script lang="ts">
	import { fade } from "svelte/transition"
	import { Grade } from "$lib/enums"

  export let categories
  export let size = "small"

	let gradeElement
	let showTooltip = false

  const grade = categoriesToScore()

  function categoriesToScore() {
		let score = 10

		const negativeCategories = categories?.filter(c => c.type == "negative").length

		score -= negativeCategories

		return Object.values(Grade).filter(g => score >= g.min_score)[0]
	}

	function outsideClick(event) {
		if (event.target == gradeElement || event.target.closest(".grade") == gradeElement) return;

		showTooltip = false
	}
</script>



<svelte:window on:click={outsideClick} />



<button
	class="grade grade--{ grade.letter }"
	class:grade--large={ size == "large" }
	bind:this={ gradeElement }
	on:mouseenter={ () => showTooltip = true }
	on:mouseleave={ () => showTooltip = false }
	on:click={ () => showTooltip = !showTooltip }>

  { #if size == "large" }
    <small>Grade</small>
  { /if }

  { grade.letter }

	{ #if showTooltip }
		<div class="tooltip" transition:fade={{ duration: 100 }}>
			{ grade.description }
		</div>
	{ /if }
	</button>



<style lang="scss">
  .grade {
    --color: var(--border-color);
		position: relative;
    display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: .15rem 0 .25rem;
		width: 2rem;
		height: 2rem;
		border: 0;
		border-radius: 99px;
		background: var(--color);
		color: white;
		font-size: 1.2rem;
		line-height: 1em;
		font-weight: bold;
		cursor: pointer;

		&:hover {
			filter: brightness(1.1);
		}

		&:focus-visible {
			border: 2px solid white;
			outline: none;
		}

    &--large {
      width: 100%;
      height: 3rem;
      border-radius: .5rem;
      font-size: 1.5rem;
    }

    $grades: (
			A: var(--green),
			B: var(--blue),
			C: var(--border-color),
			D: var(--yellow),
			E: var(--orange),
			F: var(--red)
		);

		@each $grade, $color in $grades {
			&--#{ $grade } {
				--color: #{ $color };
			}
		}

    small {
      margin-right: .5rem;
      font-size: .65em;
      font-weight: normal;
    }
  }

	.tooltip {
		position: absolute;
		left: 0;
		top: calc(100% + 0.5rem);
		width: clamp(100%, 200px, 50vw);
		padding: 0.5rem;
		border-radius: 0.5rem;
		background: inherit;
		z-index: 10;
		font-size: 0.85rem;
		font-weight: normal;
		font-style: italic;
		line-height: 1.15rem;
		box-shadow: var(--shadow-medium);

		.grade:not(.grade--large) & {
			left: 50%;
			transform: translateX(-50%);
			font-size: 0.75rem;
			line-height: 1rem;

			@media (min-width: 360px) {
				left: 0;
				transform: none;
				padding: 0.75rem;
				font-size: 0.85rem;
				line-height: 1.15rem;
			}
		}

		@media (min-width: 640px) {
			.grade--large & {
				left: calc(100% + 0.5rem);
				top: 0;
				width: clamp(100%, 400px, 50vw);
			}
		}
	}
</style>
