<Page title="{$translate('REPORT.TITLE')}">

  <p>{$translate('REPORT.INTRO')}</p>

  <Input
    id="evaluation_title"
    label="{$translate('REPORT.LABEL_REPORT_TITLE')}"
    helptext="{$translate('REPORT.INF_REPORT_TITLE')}"
  />

  <Input
    id="evaluation_commissioner"
    label="{$translate('REPORT.LABEL_COMMISSIONER')}"
    helptext="{$translate('REPORT.INF_COMMISSIONER')}"
  />

  <Input
    id="evaluation_creator"
    label="{$translate('REPORT.LABEL_CREATOR')}"
    helptext="{$translate('REPORT.INF_CREATOR')}"
  />

  <Input
    id="evaluation_date"
    label="{$translate('REPORT.LABEL_DATE')}"
    helptext="{$translate('REPORT.INF_DATE')}"
  />

  <Textarea
    id="evaluation_summary"
    label="{$translate('REPORT.LABEL_SUMMARY')}"
    helptext="{$translate('REPORT.INF_SUMMARY')}"
  />

  <Textarea
    id="evaluation_specifics"
    label="{$translate('REPORT.LABEL_SPECIFICS')}"
    helptext="{$translate('REPORT.INF_SPECIFICS')}"
  />

  <h2>{$translate('REPORT.HD_CRITERIA_REPORT')}</h2>
  <!-- Criteria here... -->
  <p class="info">Evaluation summary</p>
</Page>

<script>
  import {t as translate} from 'svelte-i18n';

  import Page from '../../Page.svelte';

  import Input from '../../formcomponents/Input.svelte';
  import Textarea from '../../formcomponents/Textarea.svelte';
</script>
