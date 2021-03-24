<!--
 * @component
 *   AuditorFilter
 *
 * @note
 *   Might be good to setup for dynamic additions
 *   e.g. pass filters and cycle with each
 *   also dispatching a FILTER event back up with details
 * -->
<div class="Auditor__Filter box">
  <div class="Auditor__Filters box-i">
    <MultipleChoice
      id="filter_wcag_version"
      label="Criterion WCAG Version"
      type="radio"
      options="{versionFilterOptions}"
      bind:value="{$auditFilter['VERSION']}"
    />

    <MultipleChoice
      id="filter_conformance_level"
      label="Criterion conformance level"
      options="{conformanceLevels}"
      helptext={false}
      bind:value="{$auditFilter['LEVEL']}"
    />
  </div>
</div>
<!-- /component -->

<style>
  .Auditor__Filter {
    grid-column: 1 / content-end;
    grid-row: 1;
    margin: 2em 0 0;
  }

  .Auditor__Filters {
    columns: 2 20rem;
    column-gap: 2rem;
  }
</style>

<script>
  import { getContext } from 'svelte';

  import { auditFilter } from '@app/stores/auditStore.js';
  import { CONFORMANCE_LEVELS, scopedWcagVersions } from '@app/stores/wcagStore.js';

  import MultipleChoice from '@app/components/form/MultipleChoice.svelte';

  const { translate } = getContext('app');

  const wcagVersions = [...$scopedWcagVersions].reverse();

  let versionFilterOptions = wcagVersions.reduce((result, version, index) => {
    const newFilter = {
      title: `WCAG ${version}`,
      value: wcagVersions.filter((VERSION) => {
        return VERSION <= version;
      }).join()
    };
    result.push(newFilter);

    if (index === $scopedWcagVersions.length - 1) {
      return result;
    }

    // Add a version added filter
    // Last index excluded, it is the first version.
    result.push({
      title: `Added in WCAG ${version}`,
      value: version
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
