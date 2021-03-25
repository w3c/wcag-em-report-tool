<aside class="Panel your-report" class:your-report--expanded="{open}">
  {#if open}
  <h2 class="Panel__Header__heading your-report__heading">
    {title}

    <button
      type="button"
      class="button-secondary button-small your-report__showhide"
      on:click={toggle}
      aria-expanded="{open}"
    >
      {@html TRANSLATED.SHOW_HIDE}
      <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
    </button>
  </h2>

  <slot />

  {:else}
    <button
      type="button"
      class="button-secondary button-small your-report__showhide"
      on:click={toggle}
      aria-expanded="{open}"
    >
      <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
      {@html TRANSLATED.SHOW_HIDE}
    </button>
  {/if}
</aside>

<style>
.your-report__showhide[aria-expanded="false"] svg {
  margin-right: .25em;
  margin-left: 0;
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

  function toggle() {
    open = !open;
  }
</script>
