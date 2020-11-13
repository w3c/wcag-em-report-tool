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

<style>
  .Auditor__Filter {
    grid-area: content;
    grid-row: 1;
    margin-bottom: 3rem;
  }

  .Auditor__Filters {
    columns: 2 20rem;
    column-gap: 2rem;
  }
</style>

<script>
  import { t as translate } from 'svelte-i18n';

  import MultipleChoice from '../formcomponents/MultipleChoice.svelte';
</script>
