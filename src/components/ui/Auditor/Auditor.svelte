<div class="Auditor">
  <AuditorFilter />

  <div class="Auditor__Assertions">
    <AuditorView criteria="{filteredCriteria}" />
  </div>
</div>

<style>
  .Auditor {
    clear: both;
  }

  .Auditor__Assertions {
    grid-column: 2 / 8;
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  :global(.Auditor__Assertions details:first-of-type h2:first-of-type) {
    margin-top: 0;
  }

  :global(.Auditor__Assertions > *:not(:last-child)) {
    margin-bottom: 1rem;
  }

  :global(.Auditor__Assertions details details) {
    padding-left: 0;
  }

  :global(.Auditor__Assertions details details details) {
    padding-left: 32px;
  }

  @media (min-width: 60rem) {
    .Auditor {
      display: grid;
      grid-template-columns:
        [left-start] minmax(auto, 12.5em)
        [left-end content-start] 1.25fr
        [content-end];
      grid-gap: 32px;
    }
  }
</style>

<script> 
  import { getContext } from 'svelte';

  import { auditFilter } from '@app/stores/auditStore.js';
  import { CONFORMANCE_LEVELS, scopedWcagVersions } from '@app/stores/wcagStore.js';

  import AuditorFilter from './AuditorFilter.svelte';
  import AuditorView from './AuditorView.svelte';

  const { scopeStore } = getContext('app');
  import { CriteriaFiltered } from '@app/stores/filteredCriteriaStore.js';

  if ($auditFilter['VERSION']) {
    $auditFilter['VERSION'] = [...$scopedWcagVersions].reverse().join();
    $auditFilter['LEVEL'] = CONFORMANCE_LEVELS.filter(
      (level) => $scopeStore['CONFORMANCE_TARGET'].indexOf(level) >= 0
    );
  }

  $: filteredCriteria = $CriteriaFiltered
    // Filter by version
    .filter((criterion) => {
      const filterVersions = $auditFilter['VERSION'];

      // Pass filtering if not enabled
      if (filterVersions.length === 0) {
        return true;
      }

      return filterVersions.indexOf(criterion.version) >= 0;
    })
    // Filter by conformance level
    .filter((criterion) => {
      const filterLevels = $auditFilter['LEVEL'];

      // Pass filtering if not enabled
      if (filterLevels.length === 0) {
        return true;
      }

      return filterLevels.indexOf(criterion.conformanceLevel) >= 0;
    });

</script>
