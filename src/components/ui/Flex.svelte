<!--
 * @component
 * Flex
 *
 * @license MIT
 * @copyright 2020 Dave Lunny
 * @url https://github.com/himynameisdave/svelte-flex/
 * -->
<div class="{classNames}" {...$$restProps}>
  <slot />
</div>
<!-- /component -->

<style>
  .Flex {
    display: flex;
  }
  /* Direction: 'row' | 'column' */
  .flex-direction--row {
    flex-direction: row;
  }
  .flex-direction--column {
    flex-direction: column;
  }
  /* Reverse the order */
  .flex-direction--row--reverse {
    flex-direction: row-reverse;
  }
  .flex-direction--column--reverse {
    flex-direction: column-reverse;
  }
  /* Align: 'start' | 'center' | 'end' | 'stretch' */
  .flex-align--start {
    align-items: flex-start;
  }
  .flex-align--center {
    align-items: center;
  }
  .flex-align--end {
    align-items: flex-end;
  }
  .flex-align--stretch {
    align-items: stretch;
  }
  /* Justfy: 'start' | 'center' | 'end' | 'around' | 'between' | 'evenly' */
  .flex-justify--start {
    justify-content: flex-start;
  }
  .flex-justify--center {
    justify-content: center;
  }
  .flex-justify--end {
    justify-content: flex-end;
  }
  .flex-justify--around {
    justify-content: space-around;
  }
  .flex-justify--between {
    justify-content: space-between;
  }
  .flex-justify--evenly {
    justify-content: space-evenly;
  }
  .flex-wrap {
    flex-wrap: wrap;
  }
</style>

<script>
  export let direction = 'row';
  export let align = 'center';
  export let justify = 'center';
  export let reverse = false;
  export let wrap = false;

  $: classNames = [
    'Flex',
    `flex-direction--${direction}${reverse ? '--reverse' : ''}`,
    `flex-align--${align}`,
    `flex-justify--${justify}`,
    wrap ? 'flex-wrap' : '',
    //  Apply any additional/custom classNames, if provided
    $$restProps.class ? $$restProps.class : '',
  ].join(' ');
</script>
