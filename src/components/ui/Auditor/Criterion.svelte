<!--
 * @component
 * Criterion
 * -->
<div class="Criterion">
  <header class="Criterion__Header">
    <h3 class="Criterion__Header__heading">{num}: {title}</h3>
    <span class="Criterion__Header__level">(Level {conformanceLevel})</span>
  </header>

  <Details
    label="{`${TRANSLATED.SHOW_DESCRIPTION_BUTTON} <span class="visuallyhidden">, ${test.title}</span>`}"
  >
    <div>{description}</div>

    {#if details.length > 0}
      <dl>
        {#each details as detail}
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
        href="https://www.w3.org/WAI/WCAG21/Understanding/{id}.html"
      >
        {TRANSLATED.UNDERSTAND_BUTTON}
        {num}
      </ResourceLink>
      <ResourceLink href="https://www.w3.org/WAI/WCAG21/quickref/#{id}">
        {TRANSLATED.HOW_TO_BUTTON}
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
    label="{TRANSLATED.SCOPE_RESULT_LEGEND}"
    test="{test}"
    subject="{scopeSubject}"
  />

  <Details label="{`<h4>${TRANSLATED.SAMPLE_RESULTS_DETAILS_BUTTON}</h4>`}">
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
          label="{TRANSLATED.RESULT_FOR_LABEL}: {sample.title || sample.description || `Sample ${index + 1}`}"
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

  import { auditSamples } from '@app/stores/auditStore.js';
  import { allSamples } from '@app/stores/sampleStore.js';
  import subjects, {
    TestSubjectTypes
  } from '@app/stores/earl/subjectStore/index.js';

  import Details from '@app/components/ui/Details.svelte';
  import EarlResult from '@app/components/EarlResult.svelte';
  import ResourceLink from '@app/components/ui/ResourceLink.svelte';

  export let test;

  const { conformanceLevel, description, details, id, num, title } = test;

  let notes;
  const { translate } = getContext('app');

  $: TRANSLATED = {
    SHOW_DESCRIPTION_BUTTON: $translate('PAGES.AUDIT.BTN_SHOW_TEXT'),
    UNDERSTAND_BUTTON: $translate('PAGES.AUDIT.UNDERSTAND'),
    HOW_TO_BUTTON: $translate('PAGES.AUDIT.HOW_TO'),
    SCOPE_RESULT_LEGEND: $translate('PAGES.AUDIT.SAMPLE_FINDINGS'),
    SAMPLE_RESULTS_DETAILS_BUTTON: $translate('PAGES.AUDIT.BTN_EXPAND_PAGES'),
    RESULT_FOR_LABEL: $translate('PAGES.AUDIT.RESULTS_FOR')
  };

  let scopeSubject = $subjects.find((subject) => {
    return subject.type.indexOf(TestSubjectTypes.WEBSITE) >= 0;
  });
</script>
