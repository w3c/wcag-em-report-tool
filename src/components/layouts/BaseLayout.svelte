<!-- @Layout:Base -->
<div id="controls" class="default-grid">
  <LanguageSelect locales={appData.locales} />
</div>

<div id="site-header" class="default-grid with-gap">
  <Header />
</div>

<NavigationBar />

<div class="default-grid">
  <slot />
  <Pager
    label="step"
    context={routes}
  />
</div>
<!-- /@Layout -->

<script>
  import appData from '../../data/app.js';

  import Header from '../Header.svelte';
  import LanguageSelect from '../i18n/LanguageSelect.svelte';
  import NavigationBar from '../NavigationBar.svelte';
  import Pager from '../Pager.svelte';

  let routes = [
    {
      title: 'START.TITLE',
      path: '/'
    },
    {
      title: 'SCOPE.TITLE',
      path: '/evaluation/scope',
    },
    {
      title: 'EXPLORE.TITLE',
      path: '/evaluation/explore',
    },
    {
      title: 'SAMPLE.TITLE',
      path: '/evaluation/sample',
    },
    {
      title: 'AUDIT.TITLE',
      path: '/evaluation/audit',
    },
    {
      title: 'SUMMARY.TITLE',
      path: '/evaluation/summary',
    },
    {
      title: 'REPORT.TITLE',
      path: '/evaluation/report',
    }
  ];
</script>
