<!--
 * @component
 *   NavigationBar
 *  -->
<nav class="Nav">
  <Grid>
    <GridItem area="full">
      <ol class="Nav__Itemcontainer">
        {#each navigationItems as navigationItem}
          <li
            class="nav__item"
            class:current="{navigationItem.path === currentPath}"
          >
            <Link to="{navigationItem.path}">{navigationItem.title}</Link>
          </li>
        {/each}
      </ol>
    </GridItem>
  </Grid>
</nav>
<!-- /component -->

<style>
  .Nav {
    background-color: #d0e1f1;
    background-color: var(--cloudy-subtle);
  }

  .Nav__Itemcontainer {
    grid-column: 2 / 10;
    display: flex;
    flex-direction: row;
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow-x: auto;
  }

  .nav__item.current {
    background-color: #fff;
  }

  @media (min-width: 40.1em) {
    .Nav__Itemcontainer {
      flex-direction: row;
    }
  }
</style>

<script>
  import { getContext } from 'svelte';
  import { Link, useLocation } from 'svelte-navigator';

  import Grid from '@app/components/ui/Grid.svelte';
  import GridItem from '@app/components/ui/GridItem.svelte';

  const { translate } = getContext('app');

  $: navigationItems = [
    {
      path: '/',
      title: $translate('UI.NAV.WZRD_START')
    },
    {
      path: '/evaluation/scope',
      title: $translate('UI.NAV.WZRD_SCOPE')
    },
    {
      path: '/evaluation/explore',
      title: $translate('UI.NAV.WZRD_EXPLORE')
    },
    {
      path: '/evaluation/sample',
      title: $translate('UI.NAV.WZRD_SAMPLE')
    },
    {
      path: '/evaluation/audit',
      title: $translate('UI.NAV.WZRD_AUDIT')
    },
    {
      path: '/evaluation/summary',
      title: $translate('UI.NAV.WZRD_REPORT')
    },
    {
      path: '/evaluation/view-report',
      title: $translate('UI.NAV.WZRD_VIEWREPORT')
    }
  ];

  const location = useLocation();

  $: currentPath = $location.pathname;
</script>
