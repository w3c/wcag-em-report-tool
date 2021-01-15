<File id="import__assertions" label="Import" on:change="{handleChange}" />

<script>

  import { importAssertions } from '../../data/stores/earl/assertionStore.js';
  import File, { readFile } from '../formcomponents/File.svelte';

  function handleChange(event) {
    const file = event.target.files[0];

    readFile(file, (result) => {
      let json;

      try {
        json = JSON.parse(result);
      } catch (error) {
        console.error(error.message);
        return;
      }

      console.log('import assertions from', json);
      importAssertions(json);
    });
  }
</script>
