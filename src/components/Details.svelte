<!--
 * @component
 * Details
 * @property label <String|@html>
 * @slot Detail contents
 * -->
<details class="Details" open={open}>
  <summary class="Details__label">
    {@html label}
  </summary>

  <div class="Details__body">
    <slot />
  </div>
</details>

<style>
  .Details {
    margin: 0;
    padding: 0;
  }

  .Details__label {
    display: inline-flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding-top: 0.25em;
  }

  :global(.Details__label > :first-child::before) {
    content: none !important;
  }

  .Details__label:focus::before,
  .Details__label:hover::before {
    color: white;
    background-color: var(--w3c-blue);
    border-color: var(--w3c-blue);
  }

  .Details__label::before {
    display: inline-block;
    content: "";
    margin-right: 0.5em;
    border: 2px solid currentColor;
    border-radius: 3px;
    padding: 0.125em;
    width: 1em;
    height: 1em;
    text-align: center;
    color: var(--wai-green);
    font-weight: bold;
  }

  .Details[open] > .Details__label::before {
    content: "–";
    line-height: 0.875em;
  }

  .Details:not([open]) > .Details__label::before {
    content: "+";
    line-height: 1em;
  }

  /* Take control of child spacing */
  :global(.Details__label > *) {
    margin: 0;
    padding: 0;
  }

  .Details__body {
    margin-top: 1em;
  }
</style>

<script>
  export let label = 'label';
  export let open = false;
</script>
