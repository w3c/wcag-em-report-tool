<!-- @Layout:Base -->
<div class="Controls">
  <Grid>
    <GridItem area="full">
      <LanguageSelect locales="{locales}" />
    </GridItem>
  </Grid>
</div>

<div id="site-header" style="padding: 0;">
  <Grid>
    <GridItem area="full">
      <div class="tool-header">
        <div class="tool-header-name">
          WCAG-EM R<span class="display-phablet">eport </span>T<span class="display-phablet">ool</span>
        </div>
        <div class="tool-header-logo">
          <a href="http://w3.org/"><img
              alt="W3C"
              src="images/w3c.svg"
            /></a>
          <a href="http://w3.org/WAI/"><img
              alt="Web Accessibility Initiative"
              src="images/wai.svg"
            /></a>
        </div>
      </div>
    </GridItem>
  </Grid>
</div>
<NavigationBar />

<div class="BaseLayout">
  <Grid>
    <GridItem area="{!isViewReport || panelIsOpen ? 'content' : 'full'}" row="1">
      <slot />

      <Pager label="{TRANSLATED.STEP}" context="{pagerContext}" />
    </GridItem>

    <GridItem area="right" row="1">
      {#if hasPanel}
      <Panel title="{TRANSLATED.HEADING_PANEL}" bind:open="{panelIsOpen}">
        <Link class="button" to="/evaluation/view-report">
          {TRANSLATED.VIEW_REPORT}
        </Link>
      </Panel>
      {/if}
  </GridItem>
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
  import { useLocation, Link } from 'svelte-navigator';

  import { routes } from '@app/stores/appStore.js';
  import locales from '@app/locales/index.json';

  import Grid from '@app/components/ui/Grid.svelte';
  import GridItem from '@app/components/ui/GridItem.svelte';
  import LanguageSelect from '@app/components/ui/LanguageSelect.svelte';
  import NavigationBar from '@app/components/ui/NavigationBar.svelte';
  import Pager from '@app/components/ui/Pager.svelte';
  import Panel from '@app/components/ui/Panel.svelte';

  const location = useLocation();
  const { translate } = getContext('app');
  let panelIsOpen = true;

  $: TRANSLATED = {
    HEADING_PANEL: $translate('UI.COMMON.YOUR_REPORT', {
      default: 'Your report'
    }),
    STEP: $translate('UI.NAV.STEP', { default: 'step' }),
    VIEW_REPORT: $translate('UI.NAV.STEP_VIEWREPORT', {
      default: 'View report'
    })
  };

  $: hasPanel = 
    ($location.pathname !== $routes.OVERVIEW.path) &&
    ($location.pathname !== $routes.VIEW_REPORT.path);
  $: isViewReport = $location.pathname === $routes.VIEW_REPORT.path;

  $: pagerContext = Object.keys($routes).map((key) => {
    return $routes[key];
  });

</script>
