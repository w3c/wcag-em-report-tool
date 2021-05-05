<Field {id} {label} {helptext}>
  <slot name="before-textarea"></slot>
  <textarea id="{id}" rows="5" bind:value on:change></textarea>
  {#if markdown}
  <a 
    href="https://en.wikipedia.org/wiki/Markdown"
    title="Markdown supported"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="2em" 
      aria-hidden="true"
      role="presentation"
      focusable="false"
      viewBox="0 0 208 128">
        <rect width="198" height="118" x="5" y="5" ry="10" stroke="currentColor" stroke-width="10" fill="none"/>
        <path fill="currentColor" d="M30 98V30h20l20 25 20-25h20v68H90V59L70 84 50 59v39zm125 0l-30-33h20V30h20v35h20z"/>
    </svg>
  </a>
  {/if}
</Field>

<style>
  textarea {
    display: block;
    width: 100%;
    box-sizing: border-box;
  }
  svg {
    color: var(--grey); 
    float: right;
  }
  a:hover svg {
    color: var(--off-black);
  }
</style>

<script>
  import Field from './Field.svelte';

  export let id;
  export let label;
  export let markdown = false;
  export let helptext = "";
  export let value = "";
</script>
