<div class="{classNames}" {style}>
  <slot />
</div>

<style>
  .Grid__Item {
    column-span: all;
  }

  .grid-area--full {
    grid-column: 2 / span 8;
  }

  .grid-area--content {
    grid-column: 2 / span 6;
  }

  .grid-area--right {
    grid-column: 8 / span 2;
  }
</style>

<script>
  export let area = 'content';
  export let row = false;

  $: classNames = [
    'Grid__Item',
    `grid-area--${area}`,
  ].join(' ');

  $: style = `
    grid-row: ${row ? row : 'auto'};
  `;
</script>
