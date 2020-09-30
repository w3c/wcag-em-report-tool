<Page title="{$translate('PAGES.REPORT.TITLE')}">

  <p>{@html $translate('PAGES.REPORT.INTRO')}</p>

  <Input
    id="evaluation_title"
    label="{$translate('PAGES.REPORT.LABEL_TITLE')}"
    helptext="{$translate('PAGES.REPORT.INF_REPORT_TITLE')}"
  />

  <Input
    id="evaluation_commissioner"
    label="{$translate('PAGES.REPORT.LABEL_COMMISSIONER')}"
    helptext="{$translate('PAGES.REPORT.INF_COMMISSIONER')}"
  />

  <Input
    id="evaluation_creator"
    label="{$translate('PAGES.REPORT.LABEL_CREATOR')}"
    helptext="{$translate('PAGES.REPORT.INF_CREATOR')}"
  />

  <Input
    id="evaluation_date"
    label="{$translate('PAGES.REPORT.LABEL_DATE')}"
    helptext="{$translate('PAGES.REPORT.INF_DATE')}"
  />

  <Textarea
    id="evaluation_summary"
    label="{$translate('PAGES.REPORT.LABEL_SUMMARY')}"
    helptext="{$translate('PAGES.REPORT.INF_SUMMARY')}"
  />

  <Textarea
    id="evaluation_specifics"
    label="{$translate('PAGES.REPORT.LABEL_SPECIFICS')}"
    helptext="{$translate('PAGES.REPORT.INF_SPECIFICS')}"
  />

  <h2>{$translate('PAGES.REPORT.HD_CRITERIA_REPORT')}</h2>
  <!-- Criteria here... -->
  <p class="info">Evaluation summary</p>
</Page>

<script>
  import {t as translate} from 'svelte-i18n';

  import Page from '../../Page.svelte';

  import Input from '../../formcomponents/Input.svelte';
  import Textarea from '../../formcomponents/Textarea.svelte';
</script>
