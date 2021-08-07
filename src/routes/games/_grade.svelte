<script lang="ts">
  import { onMount } from "svelte"

  export let categories
  export let size = "small"

  const grade = categoriesToScore()

  function categoriesToScore() {
		let score = 10

		const negativeCategories = categories?.filter(c => c.type == "negative").length

		score -= negativeCategories

		if (score == 10) return "A"
		if (score >= 8) return "B"
		if (score >= 6) return "C"
		if (score >= 4) return "D"
		if (score >= 2) return "E"
		return "F"
	}
</script>



<div class="grade grade--{ grade }" class:grade--large={ size == "large" }>
  { #if size == "large" }
    <small>Grade</small>
  { /if }
  
  { grade }
</div>



<style lang="scss">
  .grade {
    --color: var(--border-color);
    display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: .15rem 0 .25rem;
		width: 2rem;
		height: 2rem;
		border-radius: 99px;
		background: var(--color);
		color: white;
		font-size: 1.2rem;
		line-height: 1em;
		font-weight: bold;

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
</style>
