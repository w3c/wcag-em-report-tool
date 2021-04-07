<svelte:head>
  <title>{title} | WCAG-EM Report Tool</title>
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
  import { onMount } from "svelte";
  import { useLocation } from 'svelte-navigator';
  import { honourFragmentIdLinks } from '@app/scripts/honourFragmentIdLinks.js';

  const location = useLocation();

  onMount(() => {
    honourFragmentIdLinks($location);
  });

  export let title;
</script>
