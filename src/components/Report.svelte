<!--
 * @component
 *   Report
 * -->
<article class="Report" bind:this="{Report}">
  <header>
    <h1>{report.title}</h1>
    <dl>
      <dt>{TRANSLATED.LABEL_EVALUATOR}</dt>
      <dd>{report.creator || '…'}</dd>

      <dt>{TRANSLATED.LABEL_COMMISSIONER}</dt>
      <dd>{report.commissioner || '…'}</dd>

      <dt>{TRANSLATED.LABEL_DATE}</dt>
      <dd>{report.date || '…'}</dd>
    </dl>
  </header>

  <section>
    <h2>{TRANSLATED.HEADING_SUMMARY}</h2>
    <p>{report.summary || '…'}</p>
  </section>

  <section>
    <h2>{TRANSLATED.HEADING_SCOPE}</h2>

    <dl>
      <dt>{TRANSLATED.LABEL_WEBSITE_NAME}</dt>
      <dd>{scope.siteName || '…'}</dd>

      <dt>{TRANSLATED.LABEL_WEBSITE_SCOPE}</dt>
      <dd>{scope.siteScope || '…'}</dd>

      <dt>{TRANSLATED.LABEL_WCAG_VERSION}</dt>
      <dd>{scope.wcagVersion || '…'}</dd>

      <dt>{TRANSLATED.LABEL_CONFORMANCE_TARGET}</dt>
      <dd>{scope.conformanceTarget || '…'}</dd>

      <dt>{TRANSLATED.LABEL_EXTRA_REQUIREMENTS}</dt>
      <dd>{scope.extra || '…'}</dd>

      <dt>{TRANSLATED.LABEL_ACCESSIBILITY_SUPPORT_BASELINE}</dt>
      <dd>{scope.baseline || '…'}</dd>
    </dl>
  </section>

  <section>
    <h2>{TRANSLATED.HEADING_AUDIT_RESULTS_OVERVIEW}</h2>
    <p>{report.result || '…'}</p>
  </section>

  <section>
    <h2>{TRANSLATED.HEADING_AUDIT_RESULTS_DETAIL}</h2>
    <AuditorSummary criteria="{$tests}" />
  </section>

  <section>
    <h2>{TRANSLATED.HEADING_SAMPLE}</h2>
    {#if report.samples.length > 0}
      <ol>
        {#each report.samples as sample}
          <li>
            <span>{sample.title}</span> - <span>{sample.description}</span>
          </li>
        {/each}
      </ol>
    {:else}
      <p>{TRANSLATED.TEXT_NO_SAMPLE}</p>
    {/if}
  </section>

  <section>
    <h2>{TRANSLATED.HEADING_SPECIFICS}</h2>
    <p>{report.specifics || '…'}</p>
  </section>

  <aside>
    <h2>{TRANSLATED.HEADING_RESOURCES}</h2>
    <p class="info">List resources</p>
  </aside>
</article>
<!-- /component -->

<script context="module">
  import { downloadFile } from 'scripts/files.js';

  let Report;

  export function downloadReport() {
    downloadFile({
      contents: Report.outerHTML,
      name: 'report.html',
      type: 'text/html'
    });
  }
</script>

<script>
  import { getContext } from 'svelte';

  import tests from 'stores/earl/testStore.js';

  import AuditorSummary from 'components/Auditor/AuditorSummary.svelte';

  const { sampleStore, scopeStore, summaryStore, translate } = getContext(
    'app'
  );

  $: TRANSLATED = {
    LABEL_EVALUATOR: $translate('UI.REPORT.BY'),
    LABEL_COMMISSIONER: $translate('UI.REPORT.COMMISION_BY'),
    LABEL_DATE: $translate('PAGES.SUMMARY.LABEL_DATE'),
    HEADING_SUMMARY: $translate('UI.REPORT.HD_SUMMARY'),
    HEADING_SCOPE: $translate('UI.REPORT.HD_SCOPE'),
    LABEL_WEBSITE_NAME: $translate('PAGES.SCOPE.LABEL_SITE_NAME'),
    LABEL_WEBSITE_SCOPE: $translate('PAGES.SCOPE.LABEL_SITE_SCOPE'),
    LABEL_WCAG_VERSION: $translate('PAGES.SCOPE.LABEL_WCAG_VERSION'),
    LABEL_CONFORMANCE_TARGET: $translate('PAGES.SCOPE.LABEL_CONFORMANCE_TGT'),
    LABEL_EXTRA_REQUIREMENTS: $translate('PAGES.SCOPE.LABEL_EXTRA_REQUIREMENTS'),
    LABEL_ACCESSIBILITY_SUPPORT_BASELINE: $translate('PAGES.SCOPE.LABEL_SUPPORT_BASE'),
    HEADING_AUDIT_RESULTS_OVERVIEW: $translate('UI.REPORT.HD_SCORE'),
    HEADING_AUDIT_RESULTS_DETAIL: $translate('UI.REPORT.HD_CRITERIA_REPORT'),
    HEADING_SAMPLE: $translate('UI.REPORT.HD_SAMPLE'),
    HEADING_SPECIFICS: $translate('UI.REPORT.HD_SPECIFICS'),
    HEADING_RESOURCES: $translate('UI.REPORT.HD_DOCS'),
  };

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
    date: $summaryStore['EVALUATION_DATE'],
    samples: [
      ...$sampleStore['STRUCTURED_SAMPLE'],
      ...$sampleStore['RANDOM_SAMPLE']
    ],
    specifics: $summaryStore['EVALUATION_SPECIFICS'],
    summary: $summaryStore['EVALUATION_SUMMARY'],
    title: $summaryStore['EVALUATION_TITLE'] || $translate('PAGES.REPORT.TITLE')
  };
</script>
