<Page title="{TRANSLATED.PAGE_TITLE}">
  <p>
    {@html TRANSLATED.INTRODUCTION}
  </p>

  <form action="" novalidate>
    <h2>{TRANSLATED.EXPLORE_OPTIONAL_HEADING}</h2>
    <Textarea
      id="essential_functionality"
      label="{TRANSLATED.EXPLORE_ESSENTIAL_FUNCTIONALITY_LABEL}"
      bind:value="{$exploreStore['ESSENTIAL_FUNCTIONALITY']}"
    />

    <Textarea
      id="page_types"
      label="{TRANSLATED.EXPLORE_VARIETY_OF_WEB_PAGE_TYPES_LABEL}"
      bind:value="{$exploreStore['PAGE_TYPES']}"
    />

    <SampleInput
      id="structured_sample"
      bind:value="{$sampleStore['STRUCTURED_SAMPLE']}"
      label="{TRANSLATED.STRUCTURED_SAMPLE_HEADING}"
      helptext="{TRANSLATED.STRUCTURED_SAMPLE_INFO}"
    />

    <SampleInput
      id="random_sample"
      bind:value="{$sampleStore['RANDOM_SAMPLE']}"
      label="{TRANSLATED.RANDOM_SAMPLE_HEADING}"
      helptext="{TRANSLATED.RANDOM_SAMPLE_INFO}"
    >
      <p>{TRANSLATED.RANDOM_SAMPLE_NOTE}</p>
    </SampleInput>
  </form>
</Page>

<script>
  import { getContext } from 'svelte';

  import Page from '@app/components/Page.svelte';
  import SampleInput from '@app/components/formcomponents/SampleInput/SampleInput.svelte';
  import Textarea from '@app/components/formcomponents/Textarea.svelte';

  const { exploreStore, sampleStore, translate } = getContext('app');

  $: structuredSample = $sampleStore['STRUCTURED_SAMPLE'];
  $: STRUCTURED_SAMPLE_COUNT = structuredSample.length || 0;
  $: REQUIRED_RANDOM_SAMPLE_COUNT = Math.round(structuredSample.length / 10);

  $: TRANSLATED = {
    PAGE_TITLE: $translate('PAGES.SAMPLE.TITLE'),
    INTRODUCTION: $translate('PAGES.SAMPLE.INTRO'),
    EXPLORE_OPTIONAL_HEADING: $translate('PAGES.SAMPLE.HD_STRUCT_SAMPLE'),
    EXPLORE_ESSENTIAL_FUNCTIONALITY_LABEL: $translate(
      'PAGES.SAMPLE.HD_ESSENT_FUNC'
    ),
    EXPLORE_VARIETY_OF_WEB_PAGE_TYPES_LABEL: $translate(
      'PAGES.SAMPLE.HD_VARIETY_PAGE_TYPES'
    ),
    STRUCTURED_SAMPLE_HEADING: $translate('PAGES.SAMPLE.HD_STRUCT_SAMPLE_SUB'),
    STRUCTURED_SAMPLE_INFO: $translate('PAGES.SAMPLE.INF_STRUCT_SAMPLE'),
    RANDOM_SAMPLE_HEADING: $translate('PAGES.SAMPLE.HD_RANDOM_SAMPLE'),
    RANDOM_SAMPLE_INFO: $translate('PAGES.SAMPLE.INF_RAND_SAMPLE'),
    RANDOM_SAMPLE_NOTE: $translate('PAGES.SAMPLE.RAND_SAMPLE_LENGTH', {
      values: {
        STRUCTURED_SAMPLE_COUNT,
        REQUIRED_RANDOM_SAMPLE_COUNT
      }
    })
  };
</script>
