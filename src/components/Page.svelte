<svelte:head>
  <title>{title}</title>
</svelte:head>

<main>
  <h1>{title}</h1>
  <slot />
</main>

<style>
  :global(main > *:not(:last-child)) {
    margin-bottom: 1em;
  }
</style>

<script>
  export let title;
</script>
