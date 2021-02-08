<div class="{classNames}">
  <slot />
</div>

<style>
  .Grid {}

  .Grid__rightside {}
</style>

<script>
  export let rightside = false;

  $: classNames = [
    'Grid',
    'default-grid',
    rightside ? 'Grid__rightside' : '',
  ].join(' ');
</script>
