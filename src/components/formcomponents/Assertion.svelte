<!--
 * @component
 * Assertion
 * -->
<div class="Assertion">
  <header class="Assertion__Header">
    <h3 class="Assertion__Header__heading">
      {num}: {$translate(`${num}.TITLE`)}
    </h3>
    <span class="Assertion__Header__level">(Level {conformanceLevel})</span>
  </header>

  <Details label="{$translate(`${num}.TITLE`)} details">
    <div>{$translate(`${num}.DESCRIPTION.INTRODUCTION`)}</div>

    {#if details}
      <dl>
        {#each details as detail}
          <dt>{$translate(`${num}.DESCRIPTION.DETAILS.${detail}.TITLE`)}</dt>
          <dd>
            <p>
              {$translate(`${num}.DESCRIPTION.DETAILS.${detail}.DESCRIPTION`)}
            </p>
            <p class="note">
              {$translate(`${num}.DESCRIPTION.DETAILS.${detail}.NOTE`)}
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
      <ResourceLink href="#understanding">Understanding {num}</ResourceLink>
      <ResourceLink href="#how-to-meet">How to meet {num}</ResourceLink>
    </div>
  </Details>

  <fieldset class="Assertion__Result__container">
    <legend class="Assertion__Subject">
      Result for: <a
        href="subject.url"
        target="_blank"
      >{'subject.title' || 'subject.url'}</a> (<span>subject.type?</span>)
    </legend>

    <div class="Assertion__Result">
      <Select id="Result__Outcome" label="Outcome" options="{outcomeOptions}" />

      <Textarea id="Result__Description" label="Description" />
    </div>
  </fieldset>
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
    padding-left: 2em;
  }

  :global(.Assertion__Result__container > *:not(:last-child)) {
    margin-bottom: 1em;
  }

  .Assertion__Subject {
    margin-left: -2em;
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
  import { t as translate, dictionary } from 'svelte-i18n';

  import Details from '../Details.svelte';
  import ResourceLink from '../ResourceLink.svelte';

  import Select from './Select.svelte';
  import Textarea from './Textarea.svelte';

  export let num;
  export let conformanceLevel;

  let details;
  let notes;

  $: {
    try {
      details = Object.keys($dictionary[`WCAG21.${num}.DESCRIPTION.DETAILS`]);
    } catch (e) {
      details = [];
    }
  }

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
