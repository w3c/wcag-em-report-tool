<div class="Auditor">
  <div class="Auditor__samples">
    <AuditorSamples />
  </div>

  <AuditorFilter />

  <div class="Auditor__Assertions">
    <AuditorView criteria="{criteriaFiltered}" />
  </div>
</div>

<style>
  .Auditor {
  }

  .Auditor__samples {
    grid-area: left;
  }

  :global(.Auditor .Auditor__Filters > *) {
    margin-bottom: 0;
    break-inside: avoid-column;
  }

  .Auditor__Assertions {
    grid-column: 1 / 8;
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
        [left-start] 1fr
        [left-end content-start] 2fr
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
  import AuditorSamples from './AuditorSamples.svelte';
  import AuditorView from './AuditorView.svelte';

  const { scopeStore } = getContext('app');
  const { wcagCriteria } = getContext('Evaluation');

  if ($auditFilter['VERSION'].length === 0) {
    $auditFilter['VERSION'] = [...$scopedWcagVersions].reverse().join();
    $auditFilter['LEVEL'] = CONFORMANCE_LEVELS.filter(
      (level) => $scopeStore['CONFORMANCE_TARGET'].indexOf(level) >= 0
    );
  }

  $: criteriaFiltered = $wcagCriteria
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
