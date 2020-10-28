<!-- @Layout:Base -->

<div class="Controls">
  <Grid>
    <GridItem area="full">
      <LanguageSelect locales="{appData.locales}" />
    </GridItem>
  </Grid>
</div>

<div id="site-header" style="padding: 0;">
  <Grid>
    <GridItem area="full">
      <Header />
    </GridItem>
  </Grid>
</div>
<NavigationBar />

<div class="BaseLayout">
  <Grid>
    <GridItem area="{panelIsOpen ? 'content' : 'full'}" row="1">
      <slot />

      <Pager label="step" context="{routes}" />
    </GridItem>

    {#if hasPanel}
      <GridItem area="right" row="1">
        <Panel title="Your report" bind:open="{panelIsOpen}">
          <Button>View report</Button>
          <Button type="secondary">Start new Evaluation</Button>
          <Button type="secondary">Import findings</Button>
        </Panel>
      </GridItem>
    {/if}
  </Grid>
</div>
<!-- /@Layout -->

<style>
  .BaseLayout {
    padding: 2em 1em;
  }

  .Controls {
    font-size: 0.8125em;
  }

  @media (min-width: 60em) {
    .BaseLayout {
      padding: 2em 0;
    }
  }
</style>

<script>
  import { t as translate } from 'svelte-i18n';
  import { useLocation } from 'svelte-navigator';

  import appData from '../../data/app.js';

  import Button from '../Button.svelte';
  import Grid from '../Grid.svelte';
  import GridItem from '../GridItem.svelte';
  import Header from '../Header.svelte';
  import LanguageSelect from '../i18n/LanguageSelect.svelte';
  import NavigationBar from '../NavigationBar.svelte';
  import Pager from '../Pager.svelte';
  import Panel from '../Panel.svelte';

  const location = useLocation();

  $: hasPanel = $location.pathname !== '/evaluation/view-report';

  let routes = [
    {
      title: $translate('UI.NAV.STEP_START'),
      path: '/'
    },
    {
      title: $translate('UI.NAV.STEP_SCOPE'),
      path: '/evaluation/scope'
    },
    {
      title: $translate('UI.NAV.STEP_EXPLORE'),
      path: '/evaluation/explore'
    },
    {
      title: $translate('UI.NAV.STEP_SAMPLE'),
      path: '/evaluation/sample'
    },
    {
      title: $translate('UI.NAV.STEP_AUDIT'),
      path: '/evaluation/audit'
    },
    {
      title: $translate('UI.NAV.STEP_REPORT'),
      path: '/evaluation/summary'
    },
    {
      title: $translate('UI.NAV.STEP_VIEWREPORT'),
      path: '/evaluation/view-report'
    }
  ];

  $: panelIsOpen = hasPanel;
</script>
