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
  import Header from '../components/Header.svelte';
  import Footer from '../components/Footer.svelte';
</script>
