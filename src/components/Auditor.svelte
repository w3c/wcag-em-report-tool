<div>
  {#if assertions.length > 0}
    <ul class="Auditor__Assertions">
      {#each assertions as assertion}
        <li>
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
</style>

<script>
  import WCAG21 from '../data/wcag/WCAG21.json';
  import Assertion from './formcomponents/Assertion.svelte';

  let assertions = WCAG21;
</script>
