<File
  id="evaluation_open"
  label="{loading ? 'Loading Evaluation' : 'Open an Evaluation from JSON'}"
  on:change="{handleOpenChange}"
/>

<script>
  import evaluationStore from '../../data/stores/evaluationStore.js';

  import File, { readFile } from './File.svelte';

  let loading = false;

  function handleOpenChange(event) {
    loading = true;

    const { target } = event;
    const file = target.files[0];

    readFile(file, (result) => {
      const json = JSON.parse(result);

      $evaluationStore.open(json).finally(() => {
        loading = false;
      });
    });
  }
</script>
