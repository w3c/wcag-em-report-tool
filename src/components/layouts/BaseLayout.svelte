<!-- @Layout:Base -->
<div class="default-grid">
  <LanguageSelect />
  <Header />
  <NavigationBar />
</div>


<div class="default-grid">
  <slot />
</div>
<!-- /@Layout -->

<script>
  import Header from '../Header.svelte';
  import LanguageSelect from '../i18n/LanguageSelect.svelte';
  import NavigationBar from '../NavigationBar.svelte';
</script>
