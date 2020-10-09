<article class="Report" bind:this={exportableReport}>
  <header>
    <h1>report.title</h1>
    <dl>
      <dt>{$translate('UI.REPORT.BY')}</dt>
      <dd>report.creator</dd>
      <dt>{$translate('UI.REPORT.COMMISION_BY')}</dt>
      <dd>report.commissioner</dd>
    </dl>
  </header>
  <div>
    <h2>{$translate('UI.REPORT.HD_SUMMARY')}</h2>
    <p>report.summary</p>
  </div>
  <div>
    <h2>{$translate('UI.REPORT.HD_SCOPE')}</h2>
    <p>report.scope</p>
  </div>
  <div>
    <h2>{$translate('UI.REPORT.HD_SCORE')}</h2>
    <p>report.result</p>
  </div>
  <div>
    <h2>{$translate('UI.REPORT.HD_CRITERIA_REPORT')}</h2>
    <p>report.audit</p>
  </div>
  <div>
    <h2>{$translate('UI.REPORT.HD_SAMPLE')}</h2>
    <p>report.sample</p>
  </div>
  <div>
    <h2>{$translate('UI.REPORT.HD_SPECIFICS')}</h2>
    <p>report.specifics</p>
  </div>
  <div>
    <h2>{$translate('UI.REPORT.HD_DOCS')}</h2>
    <p>resources</p>
  </div>
</article>

<style>
  .Report {}
</style>

<script>
  import { t as translate } from 'svelte-i18n';

  let exportableReport;
</script>
