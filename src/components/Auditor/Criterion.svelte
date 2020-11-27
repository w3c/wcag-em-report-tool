<!--
 * @component
 * Criterion
 * -->
<div class="Criterion">
  <header class="Criterion__Header">
    <h3 class="Criterion__Header__heading">
      {num}: {$translate(`WCAG.WCAG21.SUCCESS_CRITERION.${num}.TITLE`)}
    </h3>
    <span class="Criterion__Header__level">(Level {conformanceLevel})</span>
  </header>

  <Details
    label="{`${$translate('PAGES.AUDIT.BTN_SHOW_TEXT')} <span class="visuallyhidden">for ${$translate(`WCAG.WCAG21.${num}.TITLE`)}</span>`}"
  >
    <div>{$translate(`WCAG.WCAG21.SUCCESS_CRITERION.${num}.DESCRIPTION`)}</div>

    {#if details}
      <dl>
        {#each details as detail}
          <dt>{$translate(`${detail}.TITLE`)}</dt>
          <dd>
            <p>{$translate(`${detail}.DESCRIPTION`)}</p>
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
   * assertion.subject === scope
   * assertion.result
   * -->
  <EarlResult {...scopeAssertion} />

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
    {#each $allSamples as sample (`${num}-${sample.ID}`)}
      <EarlResult subject="{sample}" />
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
  import { t as translate, dictionary, locale } from 'svelte-i18n';

  import { allSamples } from '../../data/stores/sampleStore.js';

  import Details from '../Details.svelte';
  import EarlResult from '../EarlResult.svelte';
  import ResourceLink from '../ResourceLink.svelte';

  export let num;
  export let conformanceLevel;

  // Should receive assertions specific
  // to the test.id (wich is a wcag.sc.num)
  // export let assertions;

  const { auditStore } = getContext('app');

  // Dynamicly get the amount of details from the dictionairy
  let details = Object.keys($dictionary[`${$locale}`])
    .filter((key) => {
      return (
        key.indexOf(`WCAG.WCAG21.SUCCESS_CRITERION.${num}.DETAILS`) >= 0 &&
        key.indexOf('TITLE') >= 0
      );
    })
    .map((key) => key.replace('.TITLE', ''));
  let notes;

  // We can drop this line
  $: assertions = $auditStore['ASSERTIONS'].filter((a) => a.test.num === num);

  // Find the assertion with subject
  // type WebSite === scope
  $: scopeAssertion = assertions.find(
    (a) => a.subject.type.indexOf('WebSite') >= 0
  );

  // Find the assertion with subject
  // type not WebSite (or WebPage/sample instead)
  $: sampleAssertions = assertions.filter(
    (a) => a.subject.type.indexOf('WebSite') === -1
  );
</script>
