<button type="button" class="Button Button--{type} {buttonClass}" on:click>
  <slot />
</button>

<script>
  export let type = 'primary';

  let buttonClass = `button-${type}`;
</script>
