<!--
 * @component
 * Assertion
 * -->
<div class="Assertion">
  <header class="Assertion__Header">
    <h3 class="Assertion__Header__heading">
      {num}: {$translate(`WCAG.WCAG21.${num}.TITLE`)}
    </h3>
    <span class="Assertion__Header__level">(Level {conformanceLevel})</span>
  </header>

  <Details label={`${$translate('PAGES.AUDIT.BTN_SHOW_TEXT')} <span class="visuallyhidden">for ${$translate(`WCAG.WCAG21.${num}.TITLE`)}</span>`}>
    <div>{$translate(`WCAG.WCAG21.${num}.DESCRIPTION`)}</div>

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

  <fieldset class="Assertion__Result__container">
    <legend class="Assertion__Subject">
      {$translate('PAGES.AUDIT.SAMPLE_FINDINGS')}
    </legend>

    <div class="Assertion__Result">
      <Select id="Result__Outcome" label="Outcome" options="{outcomeOptions}" />

      <Textarea id="Result__Description" label="Description" />
    </div>
  </fieldset>

  <Details label="{`<h4>${$translate('PAGES.AUDIT.BTN_EXPAND_PAGES')}</h4>`}">
    <p class="info">RESULTS INDIVIDUAL SAMPLES</p>
  </Details>
</div>
<!-- /component -->

<style>
  .Assertion {
    background-color: var(--pure-white);
    border: 1px solid var(--line-grey);
    box-shadow: 1px 1px 4px -4px #000;
    padding: 1em;
  }

  :global(.Assertion > *:not(:last-child)) {
    margin-bottom: 1em;
  }

  :global(.Assertion > *:last-child) {
    margin-bottom: 0;
  }

  .Assertion__Header {
    margin-bottom: 1em;
    font-size: 1em;
    line-height: 1.5em;
  }

  .Assertion__Header > * {
    margin: 0;
    padding: 0;
    font-size: inherit;
    line-height: inherit;
  }

  .Assertion__Header__heading {
    font-size: 1.25em;
    font-weight: normal;
  }
  .Assertion__Header__level {
    font-style: normal;
    vertical-align: middle;
    white-space: nowrap;
  }

  .Assertion__Result__container {
    display: block;
    border: none;
  }

  :global(.Assertion__Result__container > *:not(:last-child)) {
    margin-bottom: 1em;
  }

  .Assertion__Subject {
    padding: 0;
    font-size: 1em;
  }

  .Assertion__Result {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    width: auto;
    min-inline-size: 5em;
  }

  /* use :global for children as they are in different components */
  :global(.Assertion__Result label::after) {
    content: ':';
  }

  :global(.Assertion__Result > *:not(:last-child)) {
    flex: 1;
    margin-bottom: 1em;
  }

  :global(.Assertion__Result > :last-child) {
    flex: 3;
  }

  :global(.Assertion__Result textarea) {
    width: 100%;
    font-family: 'Noto Sans Mono', monospace;
  }

  @media (min-width: 40rem) {
    .Assertion__Result {
      flex-direction: row;
    }

    :global(.Assertion__Result > *:not(:last-child)) {
      margin-bottom: 0;
      margin-right: 2em;
    }
  }
</style>

<script>
  import { t as translate, dictionary, locale } from 'svelte-i18n';

  import Details from '../Details.svelte';
  import ResourceLink from '../ResourceLink.svelte';

  import Select from './Select.svelte';
  import Textarea from './Textarea.svelte';

  export let num;
  export let conformanceLevel;

  // Dynamicly get the amount of details from the dictionairy
  let details = Object.keys($dictionary[`${$locale}`]).filter((key) => {
    return (
      key.indexOf(`WCAG.WCAG21.${num}.DETAILS`) >= 0
      && key.indexOf('TITLE') >= 0
    );
  }).map(key => key.replace('.TITLE', ''));
  let notes;

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
