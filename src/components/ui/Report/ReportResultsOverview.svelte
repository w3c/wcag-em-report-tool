<ReportNumbers />

<ul class="result-cards">
  {#each resultsByCategory as category}
    <ResultCard
      label={category.name}
      items={category.items} />
  {/each}
</ul>
{#if resultsByCategory[4].items.length > 0}
  <details>
    <summary>
      <h3>{resultsByCategory[4].name} ({resultsByCategory[4].items.length})</h3>
    </summary>
    <ul class="result-missing">
      {#each resultsByCategory[4].items as item}
        <li>
          <Link to={`/evaluation/audit#criterion-${normaliseId(item)}`}>{item.test.num}</Link>
        </li>
      {/each}
    </ul>
  </details>
{/if}

<style>
  ul {
    margin: 0;
    padding: 0;
  }
  .result-cards {
    display: flex;
    justify-content: space-around;
    flex-flow: wrap;
    background-color: var(--off-white);
    border-radius: 0.5em;
  }
  @media (min-width: 60em) {
    .result-missing {
      column-count: 2;
    }
  }
</style>

<script>
  import { getContext } from 'svelte';
  import { Link } from "svelte-navigator";
  import ReportNumbers from './ReportNumbers.svelte';
  import ResultCard from './ResultCard.svelte';

  import assertions from '@app/stores/earl/assertionStore/index.js';

  const { outcomeValues } = getContext('Evaluation');

  $: resultsByCategory = $outcomeValues.map((outcomeValue) => {
    return {
      name: outcomeValue.title,
      id: outcomeValue.id,
      items: $assertions.filter(assertion => 
        assertion.result.outcome.id === outcomeValue.id)
    }
  }); 

  function normaliseId(item) {
    return item.test.num.replaceAll('.','')
  }
</script>
