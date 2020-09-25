<div>
  {#if assertions.length > 0}
    <ul class="Auditor__Assertions">
      {#each assertions as assertion}
        <li class="Auditor__Assertion">
          <Assertion {...assertion} />
        </li>
      {/each}
    </ul>
  {:else}
    <p>Nothing found add something.</p>
  {/if}
</div>

<style>
  .Auditor__Assertions {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .Auditor__Assertion:not(:last-child) {
    margin-bottom: 3em;
  }
</style>

<script>
  import WCAG21 from '../data/wcag/WCAG21.json';
  import Assertion from './formcomponents/Assertion.svelte';

  // Quick data, needs to come from context/store
  let assertions = WCAG21;
</script>
