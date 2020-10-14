<Page title="{$translate('PAGES.SAMPLE.TITLE')}">
  <p>
    {@html $translate('PAGES.SAMPLE.INTRO')}
  </p>

  <div>{$translate('PAGES.SAMPLE.HD_STRUCT_SAMPLE')}</div>

  <form action="" novalidate>
    <Textarea
      id="essential_functionality"
      label="{$translate('PAGES.SAMPLE.HD_ESSENT_FUNC')}"
      bind:value="{$exploreStore['ESSENTIAL_FUNCTIONALITY']}"
    />

    <Textarea
      id="page_types"
      label="{$translate('PAGES.SAMPLE.HD_VARIETY_PAGE_TYPES')}"
      bind:value="{$exploreStore['PAGE_TYPES']}"
    />

    <SampleInput
      id="structured_sample"
      label="{$translate('PAGES.SAMPLE.HD_STRUCT_SAMPLE_SUB')}"
      helptext="{$translate('PAGES.SAMPLE.INF_STRUCT_SAMPLE')}"
      bind:value="{$sampleStore['STRUCTURED_SAMPLE']}"
    />

    <SampleInput
      id="random_sample"
      label="{$translate('PAGES.SAMPLE.HD_RANDOM_SAMPLE')}"
      helptext="{$translate('PAGES.SAMPLE.INF_RAND_SAMPLE')}"
      bind:value="{$sampleStore['RANDOM_SAMPLE']}"
    >
      <p>{$translate('PAGES.SAMPLE.RAND_SAMPLE_LENGTH')}</p>
    </SampleInput>
  </form>
</Page>

<script>
  import { getContext } from 'svelte';
  import { t as translate } from 'svelte-i18n';

  import Page from '../../Page.svelte';
  import SampleInput from '../../formcomponents/SampleInput.svelte';
  import Textarea from '../../formcomponents/Textarea.svelte';

  const { exploreStore, sampleStore } = getContext('app');
</script>
