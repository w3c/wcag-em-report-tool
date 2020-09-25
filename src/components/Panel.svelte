<aside
  class="Panel"
  class:hidden
>
  <header class="Panel__Header">
    {#if title}
      <h2 class="Panel__Header__heading">{title}</h2>
    {/if}
    <button
      type="button"
      class="Panel__Toggle button-small showhidebutton"
      on:click="{handleToggleClick}"
      bind:this="{Panel__Toggle}"
    >{hidden ? `Show ${title}` : 'Hide'}</button>
  </header>

  <div class="Panel__Body" bind:this="{Panel_Body}">
    <slot>
      <p>Panel body</p>
    </slot>
  </div>
</aside>

<style>
  .Panel {
    box-sizing: border-box;
    -ms-grid-column: 7;
    -ms-grid-column-span: 3;
    grid-column: 7 / span 3;
    -ms-grid-row: 1;
    grid-row-start: 1;
    align-self: flex-start;

    outline: none;
    border: 1px solid var(--line-grey);
    padding: 1em;
    width: 100%;
    background-color: var(--footer-grey);
    box-shadow: 0px 2px 8px -7px #000;
  }

  .Panel.hidden {
    width: auto;
    padding: 1em;
    border: none;
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
  export let title = null;

  let Panel_Body;
  let Panel__Toggle;

  $: hidden = Panel_Body ? Panel_Body.hidden : true;

  function handleToggleClick() {
    let toggleTo = !hidden;

    Panel_Body.hidden = toggleTo;
    Panel__Toggle.setAttribute('aria-expanded', !toggleTo);
  }
</script>
