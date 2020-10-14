<article class="Report" bind:this="{exportableReport}">
  <header>
    <h1>{report.title || 'Accessibility report'}</h1>
    <dl>
      <dt>{$translate('UI.REPORT.BY')}</dt>
      <dd>{report.creator || '…'}</dd>

      <dt>{$translate('UI.REPORT.COMMISION_BY')}</dt>
      <dd>{report.commissioner || '…'}</dd>

      <dt>{$translate('PAGES.SUMMARY.LABEL_DATE')}</dt>
      <dd>{report.date || '…'}</dd>
    </dl>
  </header>
  <section>
    <h2>{$translate('UI.REPORT.HD_SUMMARY')}</h2>
    <p>{report.summary || '…'}</p>
  </section>
  <section>
    <h2>{$translate('UI.REPORT.HD_SCOPE')}</h2>

    <dl>
      <dt>{$translate('PAGES.SCOPE.LABEL_SITE_NAME')}</dt>
      <dd>{scope.siteName || '…'}</dd>

      <dt>{$translate('PAGES.SCOPE.LABEL_SITE_SCOPE')}</dt>
      <dd>{scope.siteScope || '…'}</dd>

      <dt>{$translate('PAGES.SCOPE.LABEL_WCAG_VERSION')}</dt>
      <dd>{scope.wcagVersion || '…'}</dd>

      <dt>{$translate('PAGES.SCOPE.LABEL_CONFORMANCE_TGT')}</dt>
      <dd>{scope.conformanceTarget || '…'}</dd>

      <dt>{$translate('PAGES.SCOPE.LABEL_EXTRA_REQUIREMENTS')}</dt>
      <dd>{scope.extra || '…'}</dd>

      <dt>{$translate('PAGES.SCOPE.LABEL_SUPPORT_BASE')}</dt>
      <dd>{scope.baseline || '…'}</dd>
    </dl>
  </section>
  <section>
    <h2>{$translate('UI.REPORT.HD_SCORE')}</h2>
    <p>{report.result || '…'}</p>
  </section>
  <section>
    <h2>{$translate('UI.REPORT.HD_CRITERIA_REPORT')}</h2>
    <p>{report.audit || '…'}</p>
  </section>
  <section>
    <h2>{$translate('UI.REPORT.HD_SAMPLE')}</h2>
    {#if report.samples.length > 0}
      <ol>
        {#each report.samples as sample}
          <li><span>{sample.title}</span> - <span>{sample.href}</span></li>
        {/each}
      </ol>
    {:else}
      <p>No sample</p>
    {/if}
  </section>
  <section>
    <h2>{$translate('UI.REPORT.HD_SPECIFICS')}</h2>
    <p>{report.specifics || '…'}</p>
  </section>
  <aside>
    <h2>{$translate('UI.REPORT.HD_DOCS')}</h2>
    <p class="info">resources</p>
  </aside>
</article>

<style>
  .Report {}
</style>

<script>
  import { getContext } from 'svelte';
  import { t as translate, date } from 'svelte-i18n';

  let exportableReport;

  const { sampleStore, scopeStore, summaryStore } = getContext('app');

  $: scope = {
    siteName: $scopeStore['SITE_NAME'],
    siteScope: $scopeStore['WEBSITE_SCOPE'],
    wcagVersion: $scopeStore['WCAG_VERSION'],
    conformanceTarget: $scopeStore['CONFORMANCE_TARGET'],
    extra: $scopeStore['ADDITIONAL_REQUIREMENTS'],
    baseline: $scopeStore['AS_BASELINE']
  };

  $: report = {
    commissioner: $summaryStore['EVALUATION_COMMISSIONER'],
    creator: $summaryStore['EVALUATION_CREATOR'],
    date: $date(new Date($summaryStore['EVALUATION_DATE']), { format: 'full'}),
    samples: [
      ...$sampleStore['STRUCTURED_SAMPLE'],
      ...$sampleStore['RANDOM_SAMPLE']
    ],
    specifics: $summaryStore['EVALUATION_SPECIFICS'],
    summary: $summaryStore['EVALUATION_SUMMARY']
  };
</script>
