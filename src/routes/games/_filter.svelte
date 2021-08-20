
<script lang="ts">
  import { loading, games, getGamesByGrade } from "../../stores/games"

  let debounce: any

  async function getByGrade(grade) {
    $games = []
    $loading = true
    clearTimeout(debounce)

    try {
      debounce = setTimeout(async() => {
        grade = gradeToNumber(grade)
        
        const data = await getGamesByGrade(grade.min, grade.max)
        
        $games = data
        $loading = false
      }, 500)
    } catch (error) {

    }
  }  

  function gradeToNumber(grade) {
    switch (grade) {
      case "F": return { min: 9, max: 50 }
      case "E": return { min: 7, max: 8 }
      case "D": return { min: 5, max: 6 }
      case "C": return { min: 3, max: 4 }
      case "B": return { min: 1, max: 2 }
      case "A": return { min: 0, max: 0 }
    }
  }
</script>



<div class="filter">
  View by grade: 
  
  { #each ["A", "B", "C", "D", "E", "F"] as grade }
    <button on:click={ () => getByGrade(grade) }>{ grade }</button>
  { /each }
</div>



<style lang="scss">
  .filter {
    height: 100%;
    padding: .5rem 1rem;
    border-radius: 99px;
    background: var(--bg-dark);
    box-shadow: var(--shadow-big);
  }
</style>
