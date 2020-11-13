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
      bind:value="{$auditFilter['VERSION']}"
    />

    <MultipleChoice
      id="filter_conformance_level"
      label="Criterion conformance level"
      options="{['Level A', 'Level AA', 'Level AAA']}"
      bind:value="{$auditFilter['LEVEL']}"
    />
  </div>
</div>

<style>
  .Auditor__Filter {
    grid-area: content;
    grid-row: 1;
    margin: 0 0 3rem;
  }

  .Auditor__Filters {
    columns: 2 20rem;
    column-gap: 2rem;
  }
</style>

<script>
  import { t as translate } from 'svelte-i18n';

  import { auditFilter } from '../../data/stores/auditStore.js';

  import MultipleChoice from '../formcomponents/MultipleChoice.svelte';


</script>
