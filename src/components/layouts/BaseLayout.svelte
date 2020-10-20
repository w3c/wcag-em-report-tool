<!-- @Layout:Base -->
<div id="controls" class="default-grid">
  <LanguageSelect locales={appData.locales} />
</div>

<div id="site-header" class="default-grid with-gap">
  <Header />
</div>

<NavigationBar />

<div class="BaseLayout">
  <Grid rightside="{panelIsOpen}">
    <slot />

    <Pager
      label="step"
      context={routes}
    />

    <Panel title="Your report" bind:open="{panelIsOpen}">
      <Button>View report</Button>
      <Button type="secondary">Start new Evaluation</Button>
      <Button type="secondary">Import findings</Button>
    </Panel>
  </Grid>
</div>
<!-- /@Layout -->

<style>
  .BaseLayout {
    padding: 2em 1em;
  }

  @media (min-width: 60em) {
    .BaseLayout {
      padding: 2em 0;
    }
  }
</style>

<script>
  import appData from '../../data/app.js';

  import Button from '../Button.svelte';
  import Grid from '../Grid.svelte';
  import Header from '../Header.svelte';
  import LanguageSelect from '../i18n/LanguageSelect.svelte';
  import NavigationBar from '../NavigationBar.svelte';
  import Pager from '../Pager.svelte';
  import Panel from '../Panel.svelte';

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
      path: '/evaluation/view-report',
    }
  ];

  let panelIsOpen = true;
</script>
