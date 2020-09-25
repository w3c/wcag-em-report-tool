<!--
 * @component
 * <Navigation>
 *  -->
<nav class="Nav default-grid">
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
</nav>
<!-- </Nav> -->

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

  .nav__item {
    padding: 0.25em;
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
  import { Link, useLocation } from 'svelte-navigator';

  let navigationItems = [
    {
      path: '/',
      title: 'Overview'
    },
    {
      path: '/evaluation/scope',
      title: '1. Scope'
    },
    {
      path: '/evaluation/explore',
      title: '2. Explore'
    },
    {
      path: '/evaluation/sample',
      title: '3. Sample'
    },
    {
      path: '/evaluation/audit',
      title: '4. Audit'
    },
    {
      path: '/evaluation/summary',
      title: '5. Summary'
    },
    {
      path: '/evaluation/view-report',
      title: 'View report'
    }
  ];

  const location = useLocation();

  $: currentPath = $location.pathname;
</script>
