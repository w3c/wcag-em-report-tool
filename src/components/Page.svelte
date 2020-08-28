<svelte:head>
  <title>{ title }</title>
</svelte:head>

<h1>{ title }</h1>
<slot></slot>

<script>
  export let title;
</script>
