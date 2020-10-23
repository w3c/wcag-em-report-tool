{#if fake}
  <span class="{classNames}"><slot /></span>
{:else}
  <button type="button" class="{classNames}" on:click>
    <slot />
  </button>
{/if}

<style>
  .Button {
    box-sizing: border-box;
    min-width: 1.5rem;
  }
</style>

<script>
  export let type = 'primary';
  export let fake = false;
  export let small = false;

  let classNames = [
    'Button',
    `Button--${type}`,
    small ? 'Button--small' : '',
    'button',
    `button-${type}`,
    small ? 'button-small' : ''
  ].join(' ');
</script>
