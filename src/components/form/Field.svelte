<div class="Field field">
  {#if helptext}
    <HelpText
      label="{label && `<label for="${id}">${label}</label>`}"
      icon="{helptextIcon}"
    >
      {@html helptext}
    </HelpText>
  {:else if label}<label for="{id}">{label}</label>{/if}

  <slot />
</div>

<style>
  .Field {
    padding: 0;
  }

  :global(.Field > *:not(:last-child)) {
    margin-bottom: 0.5em;
  }
</style>

<script>
  import { getContext } from 'svelte';
  import HelpText from './HelpText.svelte';

  export let id;
  export let label;
  export let helptext = "";

  const { translate } = getContext('app');

  $: TRANSLATED = {
    HIDE_INFO: $translate('UI.COMMON.BUTTON.HIDE', {
      default: 'Hide {subject}',
      values: {
        subject: $translate('UI.COMMON.BUTTON.INFO', { default: 'info' })
      }
    }),
    SHOW_INFO: $translate('UI.COMMON.BUTTON.SHOW', {
      default: 'Show {subject}',
      values: {
        subject: $translate('UI.COMMON.BUTTON.INFO')
      }
    })
  };

  $: helptextIcon = {
    collapse: TRANSLATED.HIDE_INFO,
    expand: TRANSLATED.SHOW_INFO,
    position: 'right'
  };
</script>
