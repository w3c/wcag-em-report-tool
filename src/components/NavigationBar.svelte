<!--
 * @component
 * <Navigation>
 *  -->
<nav class="Nav">
  <ol class="Nav__Itemcontainer">
    <li class="nav__item">
      <Link to="">Overview</Link>
    </li>

    <li class="nav__item">
      <Link to="evaluation/scope">1. Scope</Link>
    </li>

    <li class="nav__item">
      <Link to="/evaluation/explore">2. Explore</Link>
    </li>

    <li class="nav__item">
      <Link to="/evaluation/sample">3. Sample</Link>
    </li>

    <li class="nav__item">
      <Link to="/evaluation/audit">4. Audit</Link>
    </li>

    <li class="nav__item">
      <Link to="/evaluation/summary">5. Summary</Link>
    </li>

    <li class="nav__item">
      <Link to="/evaluation/report">Report</Link>
    </li>
  </ol>
</nav>
<!-- </Nav> -->

<style>
  .Nav {
    grid-row: 3;
    grid-column: 2 / 9;
  }

  .Nav__Itemcontainer {
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

  @media (min-width: 40.1em) {
    .Nav__Itemcontainer {
      flex-direction: row;
    }
  }
</style>

<script>
  import { Link } from 'svelte-navigator';
</script>
