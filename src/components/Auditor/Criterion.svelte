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

  <Details label={`${$translate('PAGES.AUDIT.BTN_SHOW_TEXT')} <span class="visuallyhidden">for ${$translate(`WCAG.WCAG21.${num}.TITLE`)}</span>`}>
    <div>{$translate(`WCAG.WCAG21.SUCCESS_CRITERION.${num}.DESCRIPTION`)}</div>

    {#if details}
      <dl>
        {#each details as detail}
          <dt>{$translate(`${detail}.TITLE`)}</dt>
          <dd>
            <p>
              {$translate(`${detail}.DESCRIPTION`)}
            </p>
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
      <ResourceLink href="https://www.w3.org/WAI/WCAG21/Understanding/{$translate(`WCAG.WCAG21.${num}.ID`)}.html">{$translate('PAGES.AUDIT.UNDERSTAND')} {num}</ResourceLink>
      <ResourceLink href="https://www.w3.org/WAI/WCAG21/quickref/#{$translate(`WCAG.WCAG21.${num}.ID`)}">{$translate('PAGES.AUDIT.HOW_TO')} {num}</ResourceLink>
    </div>
  </Details>

  <!--
   * Results for scope
   * assertion.subject === scope
   * assertion.result
   * -->
  <fieldset class="Criterion__Result__container">
    <legend class="Criterion__Subject">
      {$translate('PAGES.AUDIT.SAMPLE_FINDINGS')}
    </legend>

    <div class="Criterion__Result">
      <Select id="{`${num}--result__outcome`}" label="Outcome" options="{outcomeOptions}" bind:value="{scopeAssertion.result.outcome}" />

      <Textarea id="{`${num}--result__description`}" label="Description" bind:value="{scopeAssertion.result.description}" />
    </div>
  </fieldset>

  <Details label="{`<h4>${$translate('PAGES.AUDIT.BTN_EXPAND_PAGES')}</h4>`}">
    <p class="info">RESULTS INDIVIDUAL SAMPLES</p>
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

  :global(.Criterion > *:not(:last-child)) {
    margin-bottom: 1em;
  }

  :global(.Criterion > *:last-child) {
    margin-bottom: 0;
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

  .Criterion__Result__container {
    display: block;
    border: none;
  }

  :global(.Criterion__Result__container > *:not(:last-child)) {
    margin-bottom: 1em;
  }

  .Criterion__Subject {
    padding: 0;
    font-size: 1em;
  }

  .Criterion__Result {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    width: auto;
    min-inline-size: 5em;
  }

  /* use :global for children as they are in different components */
  :global(.Criterion__Result label::after) {
    content: ':';
  }

  :global(.Criterion__Result > *:not(:last-child)) {
    flex: 1;
    margin-bottom: 1em;
  }

  :global(.Criterion__Result > :last-child) {
    flex: 3;
  }

  :global(.Criterion__Result textarea) {
    width: 100%;
    font-family: 'Noto Sans Mono', monospace;
  }

  @media (min-width: 40rem) {
    .Criterion__Result {
      flex-direction: row;
    }

    :global(.Criterion__Result > *:not(:last-child)) {
      margin-bottom: 0;
      margin-right: 2em;
    }
  }
</style>

<script>
  import { getContext } from 'svelte';
  import { t as translate, dictionary, locale } from 'svelte-i18n';

  import Details from '../Details.svelte';
  import ResourceLink from '../ResourceLink.svelte';

  import Select from '../formcomponents/Select.svelte';
  import Textarea from '../formcomponents/Textarea.svelte';

  export let num;
  export let conformanceLevel;

  const { auditStore } = getContext('app');

  // Dynamicly get the amount of details from the dictionairy
  let details = Object.keys($dictionary[`${$locale}`]).filter((key) => {
    return (
      key.indexOf(`WCAG.WCAG21.SUCCESS_CRITERION.${num}.DETAILS`) >= 0
      && key.indexOf('TITLE') >= 0
    );
  }).map(key => key.replace('.TITLE', ''));
  let notes;

  $: assertions = $auditStore['ASSERTIONS'].filter((a) => a.test.num === num);
  $: scopeAssertion = assertions.find((a) => a.subject.type.indexOf('WebSite') >= 0);
  $: outcomeOptions = [
    {
      title: $translate('UI.EARL.PASSED')
    },
    {
      title: $translate('UI.EARL.FAILED')
    },
    {
      title: $translate('UI.EARL.CANT_TELL')
    },
    {
      title: $translate('UI.EARL.NOT_PRESENT')
    },
    {
      title: $translate('UI.EARL.NOT_CHECKED'),
      selected: true
    }
  ];
</script>
