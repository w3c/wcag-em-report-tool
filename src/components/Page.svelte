<svelte:head>
  <title>{title}</title>
</svelte:head>

<main>
  <h1>{title}</h1>
  <slot />
</main>

<style>
  main {
    grid-column: 2 / span 5;
    grid-row: 1;
  }

  :global(main > *:not(:last-child)) {
    margin-bottom: 1em;
  }
</style>

<script>
  export let title;
</script>
