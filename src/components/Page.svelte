<svelte:head>
  <title>{title}</title>
</svelte:head>

<main>
  <h1>{title}</h1>
  <slot />
</main>

<style>

  main {
    grid-column: 2 / span 6;
  }

</style>

<script>
  export let title;
</script>
