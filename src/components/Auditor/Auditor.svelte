<div class="Auditor">
  <div class="Auditor__samples">
    <AuditorSamples />
  </div>

  <AuditorFilter />

  <div class="Auditor__Assertions">
    <AuditorView criteria="{criteria.length > 0 ? criteria : wcag}" />
  </div>
</div>

<style>
  .Auditor {
  }

  .Auditor__samples {
    grid-area: left;
    grid-row: 1 / span 2;
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
  }
</style>

<script>
  import { getContext } from 'svelte';

  import { auditFilter } from '../../data/stores/auditStore.js';
  import { CONFORMANCE_LEVELS } from '../../data/stores/wcagStore.js';

  import AuditorFilter from './AuditorFilter.svelte';
  import AuditorSamples from './AuditorSamples.svelte';
  import AuditorView from './AuditorView.svelte';

  const { scopeStore, wcagStore } = getContext('app');

  if ($auditFilter['VERSION'].length === 0) {
    $auditFilter['VERSION'] = $scopeStore['WCAG_VERSION'];
    $auditFilter['LEVEL'] = CONFORMANCE_LEVELS.filter(
      (level) => $scopeStore['CONFORMANCE_TARGET'].indexOf(level) >= 0
    );
  }

  $: wcag = wcagStore[$auditFilter['VERSION']];

  $: criteria = wcag
    // Filter by conformance level
    .filter((criterion) => {
      return $auditFilter['LEVEL'].indexOf(criterion.conformanceLevel) >= 0;
    });
</script>
