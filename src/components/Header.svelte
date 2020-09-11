<!-- @component:Header -->
<header class="tool-header">
  <div class="tool-header-name">
    WCAG-EM R<span class="display-phablet">eport </span>T<span class="display-phablet">ool</span>
  </div>
  <Branding />
</header>
<!-- /@component -->

<style>
  header {
    grid-row: 2;
    grid-column: 2 / 10;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  header > * {
    flex-shrink: 0;
    flex-grow: 1;
  }

  .tool-header {
    color: white;
    background-color: var(--w3c-classic);
  }
</style>

<script>
  import Branding from './Branding.svelte';
</script>
