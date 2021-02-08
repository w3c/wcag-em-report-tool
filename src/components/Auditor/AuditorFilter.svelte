<div class="Auditor__Filter box">
  <header class="Auditor__Filter__header box-h">
    {$translate('UI.AUDITOR.FILTER_TITLE', { default: 'Show' })}
  </header>

  <div class="Auditor__Filters box-i">
    <MultipleChoice
      id="filter_wcag_version"
      label="Criterion WCAG Version"
      type="radio"
      options="{wcagVersions}"
      bind:value="{$auditFilter['VERSION']}"
    />

    <MultipleChoice
      id="filter_conformance_level"
      label="Criterion conformance level"
      options="{conformanceLevels}"
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
  import { getContext } from 'svelte';

  import { auditFilter } from '@app/stores/auditStore.js';
  import { CONFORMANCE_LEVELS, VERSIONS } from '@app/stores/wcagStore.js';

  import MultipleChoice from '@app/components/form/MultipleChoice.svelte';

  const { translate } = getContext('app');

  let wcagVersions = VERSIONS.reduce((result, version, index) => {
    const newFilter = {
      title: `WCAG ${version}`,
      value: version
    };
    result.push(newFilter);

    if (index === VERSIONS.length - 1) {
      return result;
    }

    // Add a version added filter
    // Last index excluded, it is the first version.
    result.push({
      title: `Added in WCAG ${version}`,
      value: `${version}+`
    });

    return result;
  }, []);

  $: conformanceLevels = CONFORMANCE_LEVELS.map((level) => {
    return {
      title: `${$translate('WCAG.COMMON.CONFORMANCE_LEVEL')} ${level}`,
      value: level
    };
  });
</script>
