<fieldset id="{id}" class="Fieldset field">
  <legend>
    {@html legend}
    <button type="button" on:click={toggle} class="button button-small showhidebutton">
      {TRANSLATED.SHOW_HIDE_HELPTEXT}
    </button>
    {#if helptext}
      {#if showHelptext}
        <div class="Fieldset__helptext">
        {@html helptext}
        </div>
      {/if}
    {/if}
  </legend>

  <div class="Fieldset__elements">
    <slot />
  </div>
</fieldset>

<style>
  .Fieldset {
    padding: 0;
  }

  .Fieldset__helptext {
    font-size: 1rem; /* reset legend size */
    font-weight: normal; /* reset legend weight */
    margin: 1em 0;
    border: solid 1px #069;
    padding: 1em;
    background-color: #d0e1f1;
  }

  :global(.Fieldset__elements > *:not(:last-child)) {
    margin-bottom: 2rem;
  }
</style>

<script>
  import { getContext } from 'svelte';

  export let id;
  export let legend;
  export let helptext = "";

  function toggle() {
    showHelptext = !showHelptext;
  }

  let showHelptext = false;

  const { translate } = getContext('app');
  $: TRANSLATED = {
    SHOW_HIDE_HELPTEXT: showHelptext
      ? $translate('UI.COMMON.BUTTON.HIDE', {
          values: { subject: $translate('UI.COMMON.BUTTON.INFO') }
        })
      : $translate('UI.COMMON.BUTTON.SHOW', {
          values: { subject: $translate('UI.COMMON.BUTTON.INFO') }
        })
  };
</script>
