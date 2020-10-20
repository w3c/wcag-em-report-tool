<div class="{classNames}">
  <slot />
</div>

<style>
  .Grid {
    display: grid;
  }
</style>

<script>
  export let rightside = false;

  $: classNames = [
    'Grid',
    'default-grid',
    rightside ? 'Grid__rightside' : '',
  ].join(' ');
</script>
