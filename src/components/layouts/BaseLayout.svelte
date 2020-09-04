<!-- @Layout:Base -->
<Header />
<Menubar />

<slot />

<Footer />
<!-- /@Layout -->

<script>
  import Header from '../Header.svelte';
  import Menubar from '../Menubar.svelte';
  import Footer from '../Footer.svelte';
</script>
