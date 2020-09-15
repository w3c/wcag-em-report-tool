<!-- @Layout:Base -->
<div id="controls" class="default-grid">
  <LanguageSelect />
</div>

<div id="site-header" class="default-grid with-gap">
  <Header />
</div>

<NavigationBar />

<div class="default-grid">
  <slot />
</div>
<!-- /@Layout -->

<script>
  import Header from '../Header.svelte';
  import LanguageSelect from '../i18n/LanguageSelect.svelte';
  import NavigationBar from '../NavigationBar.svelte';
</script>
