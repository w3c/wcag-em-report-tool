<div class="Auditor">
  <div class="Auditor__samples">
    <AuditorSamples />
  </div>

  <div class="Auditor__Filter box">
    <header class="Auditor__Filter__header box-h">
      {$translate('UI.AUDITOR.FILTER_TITLE', { default: 'Show' })}
    </header>

    <div class="Auditor__Filters box-i">
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
    <div class="Auditor__Assertions">
      {#each [...principles] as principle}
        <Details label="{`<h2>${$translate(`WCAG.2.1.PRINCIPLE.${principle}`)}</h2>`}" open>
          {#each [...guidelines].filter((g) => g.indexOf(principle) === 0) as guideline}
            <Details label="{`<h3>${$translate(`WCAG.2.1.GUIDELINE.${guideline}`)}</h3>`}" open>
              {#each assertions.filter((a) => a.num.indexOf(guideline) === 0) as assertion}
                <div class="Auditor__Assertion">
                  <Assertion {...assertion} />
                </div>
              {/each}
            </Details>
          {/each}
        </Details>
      {/each}
    </div>
  {:else}
    <p>Nothing found add something.</p>
  {/if}
</div>

<style>
  .Auditor {
  }

  .Auditor__samples {
    grid-area: left;
    grid-row: 1 / span 2;
  }

  .Auditor__Filter {
    grid-area: content;
    grid-row: 1;
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
    grid-area: content;
    grid-row: 2;
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  :global(.Auditor__Assertions > *:not(:last-child)) {
    margin-bottom: 1rem;
  }

  .Auditor__Assertion:not(:last-child) {
    margin-bottom: 3em;
  }

  @media (min-width: 60rem) {
    .Auditor {
      display: grid;
      grid-template-columns:
        [left-start] 1fr
        [left-end content-start] 2fr
        [content-end];
      grid-gap: 32px;
    }

    .Auditor__Filter {
      margin: 0;
    }
  }
</style>

<script>
  import { t as translate } from 'svelte-i18n';

  import WCAG21 from '../../data/wcag/WCAG21.json';

  import Assertion from '../formcomponents/Assertion.svelte';
  import AuditorSamples from './AuditorSamples.svelte';
  import Details from '../Details.svelte';
  import MultipleChoice from '../formcomponents/MultipleChoice.svelte';

  // Quick data, needs to come from context/store
  let assertions = WCAG21;

  let principles = new Set(assertions.map((a) => a.num.split('.')[0]));
  let guidelines = new Set(
    assertions.map((a) => {
      const splitted = a.num.split('.');

      return `${splitted[0]}.${splitted[1]}`;
    })
  );
</script>
