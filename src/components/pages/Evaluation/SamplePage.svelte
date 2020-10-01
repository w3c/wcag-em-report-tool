<Page title="{$translate('PAGES.SAMPLE.TITLE')}">
  <p>
    {@html $translate('PAGES.SAMPLE.INTRO')}
  </p>

  <div>{$translate('PAGES.SAMPLE.HD_STRUCT_SAMPLE')}</div>

  <form action="" novalidate>
    <Textarea
      id="essential_functionality"
      label="{$translate('PAGES.SAMPLE.HD_ESSENT_FUNC')}"
    />

    <Textarea
      id="page_types"
      label="{$translate('PAGES.SAMPLE.HD_VARIETY_PAGE_TYPES')}"
    />

    <!-- listinput -->
    <fieldset>
      <legend>{$translate('PAGES.SAMPLE.HD_STRUCT_SAMPLE_SUB')}</legend>
      <Details label="Info">{@html $translate('PAGES.SAMPLE.INF_STRUCT_SAMPLE')}</Details>

      <Input
        id="structured_sample__shortname"
        label="{$translate('PAGES.SAMPLE.LABEL_HANDLE')}"
      />
      <Input
        id="structured_sample__description"
        label="{$translate('PAGES.SAMPLE.LABEL_PAGE')}"
        helptext="URL, path to sample or description"
      />
      <button type="button" class="button-secondary">{$translate('PAGES.SAMPLE.BTN_ADD_PAGE')}</button>
    </fieldset>

    <!-- listinput -->
    <fieldset>
      <legend>{$translate('PAGES.SAMPLE.HD_RANDOM_SAMPLE')}</legend>
      <Details label="Info">{@html $translate('PAGES.SAMPLE.INF_RAND_SAMPLE')}</Details>

      <p>{$translate('PAGES.SAMPLE.RAND_SAMPLE_LENGTH')}</p>

      <Input
        id="random_sample__shortname"
        label="{$translate('PAGES.SAMPLE.LABEL_HANDLE')}"
      />
      <Input
        id="random_sample__description"
        label="{$translate('PAGES.SAMPLE.LABEL_PAGE')}"
        helptext="URL, path to sample or description"
      />
      <button type="button" class="button-secondary">{$translate('PAGES.SAMPLE.BTN_ADD_PAGE')}</button>
    </fieldset>
  </form>
</Page>

<script>
  import { t as translate } from 'svelte-i18n';

  /**
   * Use evaluation context data here:
   * - data from ExplorePage
   */

  import Page from '../../Page.svelte';
  import Details from '../../Details.svelte';

  import Input from '../../formcomponents/Input.svelte';
  import Textarea from '../../formcomponents/Textarea.svelte';
</script>
