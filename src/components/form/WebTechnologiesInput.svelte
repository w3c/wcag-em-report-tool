<MultipleChoice
  id="technologies_relied_upon"
  label="{TECHNOLOGIES_LABEL}"
  helptext="{TECHNOLOGIES_HELPTEXT}"
  bind:options="{$webTechnologyStore}"
  bind:value
/>

<AddOther
  label="Add other {TECHNOLOGY_NAME_LABEL}"
  on:ADD="{handleTechnologyAdd}"
>
  <Input
    id="technologies_relied_upon__other--name"
    label="{TECHNOLOGY_NAME_LABEL}"
    helptext="{TECHNOLOGY_HELPTEXT}"
  />
  <Input
    id="technologies_relied_upon__other--url"
    label="{TECHNOLOGY_URL_LABEL}"
  />
</AddOther>

<script>
  import { getContext } from 'svelte';

  import { webTechnologyStore } from '@app/stores/exploreStore.js';

  import AddOther from './AddOther.svelte';
  import Input from './Input.svelte';
  import MultipleChoice from './MultipleChoice.svelte';

  export let value = [];

  const { translate } = getContext('app');
  $: TECHNOLOGIES_LABEL = $translate('PAGES.EXPLORE.HD_RELIEDUP_TECH');
  $: TECHNOLOGIES_HELPTEXT = $translate('PAGES.EXPLORE.INF_RELIEDUP_TECH');
  $: TECHNOLOGY_HELPTEXT = $translate('PAGES.EXPLORE.PLH_TECH');
  $: TECHNOLOGY_NAME_LABEL = $translate('PAGES.EXPLORE.LABEL_TECH');
  $: TECHNOLOGY_URL_LABEL = $translate('PAGES.EXPLORE.LABEL_TECH_SPEC');

  function handleTechnologyAdd(event) {
    const { detail } = event;
    const [title, description] = detail;
    const currentTechnologies = $webTechnologyStore;
    const withValue = detail.reduce((hasValue, value) => {
      if (hasValue) {
        return true;
      }

      return value.length > 0;
    }, false);

    function exists(tech) {
      return currentTechnologies.some((currentTech) => {
        return (
          currentTech === tech ||
          currentTech.title === tech.title ||
          currentTech.description === tech.description
        );
      });
    }

    if (!withValue) {
      return;
    }

    if (withValue && !exists({ title, detail })) {
      webTechnologyStore.create({
        title,
        description
      });

      value = [...value, title];
    }
  }
</script>
