<File
  id="evaluation_open"
  label="{loading ? 'Loading Evaluation' : 'Open an Evaluation from JSON'}"
  on:change="{handleOpenChange}"
/>

<script>
  import { getContext } from 'svelte';

  import appContext from '../../data/jsonld/appContext.js';

  import File, { readFile } from './File.svelte';

  const { jsonld } = getContext('app');

  let loading = false;

  function handleOpenChange(event) {
    loading = true;

    const { target } = event;
    const file = target.files[0];

    readFile(file, (result) => {
      const json = JSON.parse(result);
      // console.log(JSON.parse(result));
      jsonld
        .expand(json)
        .then((expanded) => {
          console.log(expanded);

          jsonld.compact(expanded, appContext).then((compacted) => {
            console.log(compacted);

            loading = false;
          });
        })
        .catch((error) => {
          console.error(error.name, error.message);
          loading = false;
        });
    });
  }
</script>
