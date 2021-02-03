<fieldset id="{id}" class="Fieldset field">
  <legend>
    {@html legend}
  </legend>

  {#if helptext}
    <div class="Fieldset__helptext">
      <Details label="{TRANSLATED.SHOW_HIDE_HELPTEXT}" bind:open="{showHelptext}">
        {@html helptext}
      </Details>
    </div>
  {/if}

  <div class="Fieldset__elements">
    <slot />
  </div>
</fieldset>

<style>
  .Fieldset {
    padding: 0;
  }

  .Fieldset__helptext {
    margin: 1em 0;
  }

  :global(.Fieldset__elements > *:not(:last-child)) {
    margin-bottom: 2rem;
  }
</style>

<script>
  import { getContext } from 'svelte';
  import Details from 'components/Details.svelte';

  export let id;
  export let legend;
  export let helptext;

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
