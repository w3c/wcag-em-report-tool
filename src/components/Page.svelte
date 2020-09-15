<svelte:head>
  <title>{title}</title>
</svelte:head>

<main>
  <h1>{title}</h1>
  <slot />
</main>

<style>

  main {
    margin-top: 3em;
    grid-column: 2 / span 6;
    grid-row-start: 2;
  }

</style>

<script>
  export let title;
</script>
