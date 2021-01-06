<!--
 * @component
 * Criterion
 * -->
<div class="Criterion">
  <header class="Criterion__Header">
    <h3 class="Criterion__Header__heading">
      {num}: {test.title}
    </h3>
    <span class="Criterion__Header__level">(Level {conformanceLevel})</span>
  </header>

  <Details
    label="{`${$translate('PAGES.AUDIT.BTN_SHOW_TEXT')} <span class="visuallyhidden">for ${$translate(`WCAG.WCAG21.${num}.TITLE`)}</span>`}"
  >
    <div>{test.description}</div>

    {#if test.details.length > 0}
      <dl>
        {#each test.details as detail}
          <dt>{detail.title}</dt>
          <dd>
            <p>{detail.description}</p>
          </dd>
        {/each}
      </dl>
    {/if}

    {#if notes}
      <div>
        <span>test.description.notes</span>
        <ol>
          {#each notes as note}
            <li>
              <p class="note"><span>Note:</span> <span>{note}</span></p>
            </li>
          {/each}
        </ol>
      </div>
    {/if}

    <div class="">
      <ResourceLink
        href="https://www.w3.org/WAI/WCAG21/Understanding/{$translate(`WCAG.WCAG21.SUCCESS_CRITERION.${num}.ID`)}.html"
      >
        {$translate('PAGES.AUDIT.UNDERSTAND')}
        {num}
      </ResourceLink>
      <ResourceLink
        href="https://www.w3.org/WAI/WCAG21/quickref/#{$translate(`WCAG.WCAG21.SUCCESS_CRITERION.${num}.ID`)}"
      >
        {$translate('PAGES.AUDIT.HOW_TO')}
        {num}
      </ResourceLink>
    </div>
  </Details>

  <!--
   * Results for scope
   * assertion.subject === WebSite
   * assertion.result
   * -->
  <EarlResult
    label="{$translate('PAGES.AUDIT.SAMPLE_FINDINGS')}"
    test="{test}"
    subject="{scopeSubject}"
  />

  <Details label="{`<h4>${$translate('PAGES.AUDIT.BTN_EXPAND_PAGES')}</h4>`}">
    <!--
     * Sample results should be generated from
     * (sample) assertions.
     * Assertions should be preferably created at
     * samplePage or sampleInput?
     * Then assertions should be filtered
     * by the selected list of AuditorSamples.
     *
     * Then each assertion => <EarlResult {...assertion} />
   -->
    {#each $allSamples as sample, index (`${num}-${sample.ID}`)}
      {#if $auditSamples.indexOf(sample.ID) >= 0}
        <EarlResult
          label="{$translate('PAGES.AUDIT.RESULTS_FOR')}: {sample.title || sample.description || `Sample ${index + 1}`}"
          test="{test}"
          subject="{sample}"
        />
      {/if}
    {:else}
      <p>No sample(s) selected.</p>
    {/each}
  </Details>
</div>
<!-- /component -->

<style>
  .Criterion {
    background-color: var(--pure-white);
    border: 1px solid var(--line-grey);
    box-shadow: 1px 1px 4px -4px #000;
    padding: 1em;
  }

  .Criterion__Header {
    margin-bottom: 1em;
    font-size: 1em;
    line-height: 1.5em;
  }

  .Criterion__Header > * {
    margin: 0;
    padding: 0;
    font-size: inherit;
    line-height: inherit;
  }

  .Criterion__Header__heading {
    font-size: 1.25em;
    font-weight: normal;
  }
  .Criterion__Header__level {
    font-style: normal;
    vertical-align: middle;
    white-space: nowrap;
  }
</style>

<script>
  import { getContext } from 'svelte';

  import { auditSamples } from '../../data/stores/auditStore.js';
  import { allSamples } from '../../data/stores/sampleStore.js';
  import subjects, { TestSubjectTypes } from '../../data/stores/earl/subjectStore/';

  import Details from '../Details.svelte';
  import EarlResult from '../EarlResult.svelte';
  import ResourceLink from '../ResourceLink.svelte';

  export let test;

  const { translate } = getContext('app');
  let notes;
  const { conformanceLevel, num } = test;

  let scopeSubject = $subjects.find((subject) => {
    return subject.type.indexOf(TestSubjectTypes.WEBSITE) >= 0;
  });
</script>
