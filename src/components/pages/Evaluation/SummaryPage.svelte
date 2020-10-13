<Page title="{$translate('PAGES.SUMMARY.TITLE')}">

  <p>{@html $translate('PAGES.SUMMARY.INTRO')}</p>

  <form action="" novalidate>
    <Input
      id="evaluation_title"
      label="{$translate('PAGES.SUMMARY.LABEL_TITLE')}"
      helptext="{$translate('PAGES.SUMMARY.INF_REPORT_TITLE')}"
      bind:value="{$summaryStore['EVALUATION_TITLE']}"
    />

    <Input
      id="evaluation_commissioner"
      label="{$translate('PAGES.SUMMARY.LABEL_COMMISSIONER')}"
      helptext="{$translate('PAGES.SUMMARY.INF_COMMISSIONER')}"
      bind:value="{$summaryStore['EVALUATION_COMMISSIONER']}"
    />

    <Input
      id="evaluation_creator"
      label="{$translate('PAGES.SUMMARY.LABEL_CREATOR')}"
      helptext="{$translate('PAGES.SUMMARY.INF_CREATOR')}"
      bind:value="{$summaryStore['EVALUATION_CREATOR']}"
    />

    <Input
      id="evaluation_date"
      label="{$translate('PAGES.SUMMARY.LABEL_DATE')}"
      helptext="{$translate('PAGES.SUMMARY.INF_DATE')}"
      bind:value="{$summaryStore['EVALUATION_DATE']}"
    />

    <Textarea
      id="evaluation_summary"
      label="{$translate('PAGES.SUMMARY.LABEL_SUMMARY')}"
      helptext="{$translate('PAGES.SUMMARY.INF_SUMMARY')}"
      bind:value="{$summaryStore['EVALUATION_SUMMARY']}"
    />

    <Textarea
      id="evaluation_specifics"
      label="{$translate('PAGES.SUMMARY.LABEL_SPECIFICS')}"
      helptext="{$translate('PAGES.SUMMARY.INF_SPECIFICS')}"
      bind:value="{$summaryStore['EVALUATION_SPECIFICS']}"
    />
  </form>

  <h2>{$translate('PAGES.SUMMARY.HD_CRITERIA_REPORT')}</h2>
  <!-- Criteria here... -->
  <p class="info">Evaluation summary</p>
</Page>

<script>
  import { getContext } from 'svelte';
  import {t as translate} from 'svelte-i18n';

  import Page from '../../Page.svelte';

  import Input from '../../formcomponents/Input.svelte';
  import Textarea from '../../formcomponents/Textarea.svelte';

  const { summaryStore } = getContext('app');
</script>
