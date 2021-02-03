<File
  id="evaluation_open"
  label="{TRANSLATED.BUTTON}"
  on:change="{handleOpenChange}"
/>

<script>
  import { getContext } from 'svelte';
  import { useNavigate } from 'svelte-navigator';
  import evaluationStore from 'data/stores/evaluationStore.js';

  import File, { readFile } from './File.svelte';

  const { translate } = getContext('app');

  $: TRANSLATED = {
    BUTTON: $translate('UI.NAV.MENU_OPEN', {default: 'Open evaluation'})
  };

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
