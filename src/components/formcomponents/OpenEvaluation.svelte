<File
  id="evaluation_open"
  label="{loading ? 'Loading Evaluation' : 'Open an Evaluation from JSON'}"
  on:change="{handleOpenChange}"
/>

<script>
  import { useNavigate } from 'svelte-navigator';
  import evaluationStore from '../../data/stores/evaluationStore.js';

  import File, { readFile } from './File.svelte';

  let loading = false;
  const navigate = useNavigate();

  function handleOpenChange(event) {
    loading = true;

    const { target } = event;
    const file = target.files[0];

    readFile(file, (result) => {
      const json = JSON.parse(result);

      $evaluationStore
        .open(json)
        .then(() => {
          navigate('/evaluation/scope');
        })
        .finally(() => {
          loading = false;
        });
    });
  }
</script>
