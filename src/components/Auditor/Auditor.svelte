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
        options="{['WCAG 2.1', 'Added in WCAG 2.1', 'WCAG 2.0']}"
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

  <div class="Auditor__Assertions">
    <AuditorView criteria="{$wcagStore}" />
  </div>
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
  import { getContext } from 'svelte';
  import { t as translate } from 'svelte-i18n';

  import AuditorSamples from './AuditorSamples.svelte';
  import AuditorView from './AuditorView.svelte';
  import MultipleChoice from '../formcomponents/MultipleChoice.svelte';

  const { wcagStore } = getContext('app');


</script>
