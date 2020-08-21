<script context="module">
  import { waitLocale } from 'svelte-i18n'

  export async function preload() {
    // awaits for the loading of the 'en-US' and 'en' dictionaries
    return waitLocale();
  }
</script>

<!-- @layout -->
<svelte:head>
  <!-- WAI Website Components: https://w3c.github.io/wai-website-components/index.html -->
  <link rel="stylesheet" href="https://www.w3.org/WAI/assets/css/style.css">
</svelte:head>

<Header />

<main>
  <slot></slot>
</main>

<Footer />
<!-- /@layout -->

<script>
  // Layout components receive a segment property
  // export let segment;

  import Header from '../includes/components/Header.svelte';
  import Footer from '../includes/components/Footer.svelte';
</script>
