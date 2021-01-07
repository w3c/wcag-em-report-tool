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
          <!--
           * @note
           * Panel slotted stuff is layout/page dependend
           * We should try to think of a way to achieve this.
           * e.g. in Context / store state
           * -->

          <!-- State based; is there an open Evaluation? -->
          <Link class="button" to="/evaluation/view-report">View report</Link>
          <Button type="secondary" on:click="{handleNewEvaluationClick}">
            Start new Evaluation
          </Button>
          <OpenEvaluation />
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
  import { getContext } from 'svelte';
  import { useNavigate, useLocation, Link } from 'svelte-navigator';

  import evaluationStore from '../../data/stores/evaluationStore.js';
  import appData from '../../data/app.js';

  import Button from '../Button.svelte';
  import OpenEvaluation from '../formcomponents/OpenEvaluation.svelte';
  import Grid from '../Grid.svelte';
  import GridItem from '../GridItem.svelte';
  import Header from '../Header.svelte';
  import LanguageSelect from '../i18n/LanguageSelect.svelte';
  import NavigationBar from '../NavigationBar.svelte';
  import Pager from '../Pager.svelte';
  import Panel from '../Panel.svelte';

  const { translate } = getContext('app');
  const location = useLocation();
  const navigate = useNavigate();

  $: hasPanel = $location.pathname !== '/evaluation/view-report';

  // Move to appStore -> $routes(derived)
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

  function handleNewEvaluationClick() {
    $evaluationStore.reset();
    navigate('/evaluation/scope', { replace: true });
  }
</script>
