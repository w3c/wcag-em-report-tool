<Page title="{$translate('SAMPLE.TITLE')}">
  <p>{$translate('SAMPLE.INTRO')}</p>
  {$translate('SAMPLE.HD_STRUCT_SAMPLE')}

  <form action="" novalidate>
    <Textarea
      id="essential_functionality"
      label="{$translate('SAMPLE.HD_ESSENT_FUNC')}"
    />

    <Textarea
      id="page_types"
      label="{$translate('SAMPLE.HD_VARIETY_PAGE_TYPES')}"
    />

    <!-- listinput -->
    <Textarea
      id="structured_sample"
      label="{$translate('SAMPLE.HD_STRUCT_SAMPLE_SUB')}"
      helptext="{$translate('SAMPLE.INF_STRUCT_SAMPLE')}"
    />

    <!-- listinput -->
    <Textarea
      id="random_sample"
      label="{$translate('SAMPLE.HD_RANDOM_SAMPLE')}"
      helptext="{$translate('SAMPLE.INF_RAND_SAMPLE')}"
    />
    <p>{$translate('SAMPLE.RAND_SAMPLE_LENGTH')}</p>
  </form>
</Page>

<script>
  import { t as translate } from 'svelte-i18n';

  /**
   * Use evaluation context data here:
   * - data from ExplorePage
   */

  import Page from '../../Page.svelte';

  import Textarea from '../../formcomponents/Textarea.svelte';
</script>
