<svelte:head>
  <title>{title}</title>
</svelte:head>

<main>
  <h1>{title}</h1>
  <slot />
</main>

<script>
  export let title;
</script>
