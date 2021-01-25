<aside class="Panel your-report" class:hidden="{!open}">
  <header class="Panel__Header">
    {#if title}
      <h2 class="Panel__Header__heading">{title}</h2>
    {/if}
    <button
      type="button"
      class="Panel__Toggle button-small showhidebutton"
      on:click="{handleToggleClick}"
      aria-expanded="{open}"
    >{@html TRANSLATED.SHOW_HIDE}</button>
  </header>

  <div class="Panel__Body" hidden="{!open}">
    <slot />
  </div>
</aside>

<style>
  .Panel {
    box-sizing: border-box;
    border: 1px solid var(--line-grey);
    padding: 1em;
    width: 100%;
    background-color: var(--footer-grey);
    box-shadow: 0px 2px 8px -7px #000;
  }

  .Panel.hidden {
    width: auto;
    padding: 1em;
    border-color: transparent;
    background-color: transparent;
    box-shadow: none;
  }

  @media (min-width: 60em) {
    .Panel {
      position: sticky;
      top: 1em;
    }
  }
  .Panel__Header {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    border-bottom: 1px solid var(--line-grey);
    margin-bottom: 1em;
  }

  .Panel.hidden > .Panel__Header {
    border-bottom-color: transparent;
  }

  .Panel__Header__heading {
    margin: 0;
    margin-right: 1em;
    border-bottom: none;
    font-size: 1em;
    line-height: 1.5;
    font-weight: bold;
  }

  .Panel.hidden .Panel__Header__heading {
    display: none;
  }

  .Panel:not(.hidden) > .Panel__Body {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
  }

  :global(.Panel__Body > *:not(:last-child)) {
    margin: 0 0 1em;
  }

  :global(.Panel__Body > :last-child) {
    margin-bottom: 0;
  }

  .Panel__Toggle {
    flex-shrink: 0;
    margin-left: auto;
    padding: 0.25em;
    cursor: pointer;
    word-wrap: break-word;
  }

  .Panel.hidden .Panel__Toggle {
    flex-shrink: 1;
  }

  .showhidebutton::after {
    /* Corrections */
    margin-left: 0.5em;
  }
</style>

<script>
  import { getContext } from 'svelte';

  export let title = null;
  export let open = false;

  const { translate } = getContext('app');

  $: TRANSLATED = {
    SHOW_HIDE: open
      ? $translate('UI.COMMON.BUTTON.HIDE', {
          default: 'Hide {subject}',
          values: { subject: `<span class="visuallyhidden">${title || ''}</span>` }
        })
      : $translate('UI.COMMON.BUTTON.SHOW', {
          default: 'Show {subject}',
          values: { subject: title || '' }
        })
  };

  function handleToggleClick() {
    let toggleTo = !open;

    open = toggleTo;
  }
</script>
