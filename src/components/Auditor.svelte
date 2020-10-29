<div class="Auditor">
  <div class="Auditor__Filter box box-simple">
    <header class="box-h box-h-simple">
      {$translate('UI.AUDITOR.FILTER_TITLE', { default: 'Filter findings by' })}
    </header>

    <div class="Auditor__Filters">
      <MultipleChoice
        id="filter_wcag_version"
        label="Criterion WCAG Version"
        type="radio"
        options="{['WCAG 2.2', 'WCAG 2.1', 'WCAG 2.0']}"
        value="WCAG 2.1"
      />

      <MultipleChoice
        id="filter_conformance_level"
        label="Criterion conformance level"
        options="{['Level A', 'Level AA', 'Level AAA']}"
        value="{['Level A', 'Level AA']}"
      />
    </div>
  </div>

  {#if assertions.length > 0}
    <ul class="Auditor__Assertions">
      {#each assertions as assertion}
        <li class="Auditor__Assertion">
          <Assertion {...assertion} />
        </li>
      {/each}
    </ul>
  {:else}
    <p>Nothing found add something.</p>
  {/if}
</div>

<style>
  .Auditor__Filter {
    margin-bottom: 3rem;
  }

  .Auditor__Filters {
    columns: 4 20rem;
    column-gap: 2rem;
  }

  :global(.Auditor .Auditor__Filters > *) {
    margin-bottom: 0;
    break-inside: avoid-column;
  }

  .Auditor__Assertions {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .Auditor__Assertion:not(:last-child) {
    margin-bottom: 3em;
  }
</style>

<script>
  import { t as translate } from 'svelte-i18n';

  import WCAG21 from '../data/wcag/WCAG21.json';
  import Assertion from './formcomponents/Assertion.svelte';
  import MultipleChoice from './formcomponents/MultipleChoice.svelte';

  // Quick data, needs to come from context/store
  let assertions = WCAG21;
</script>
