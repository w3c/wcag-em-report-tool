<!--
 * @component
 *   Report
 * -->
<h2>{TRANSLATED.HEADING_ABOUT}</h2>
<dl>
  <dt>{TRANSLATED.LABEL_EVALUATOR}</dt>
  <dd>{report.creator || TRANSLATED.LABEL_NOT_PROVIDED}</dd>

  <dt>{TRANSLATED.LABEL_COMMISSIONER}</dt>
  <dd>{report.commissioner || TRANSLATED.LABEL_NOT_PROVIDED}</dd>

  <dt>{TRANSLATED.LABEL_DATE}</dt>
  <dd>{report.date || TRANSLATED.LABEL_NOT_PROVIDED}</dd>
</dl>

<h2>{TRANSLATED.HEADING_SUMMARY}</h2>
<p>{report.summary || TRANSLATED.LABEL_NOT_PROVIDED}</p>

<h2>{TRANSLATED.HEADING_SCOPE}</h2>
<dl>
  <dt>{TRANSLATED.LABEL_WEBSITE_NAME}</dt>
  <dd>{scope.siteName || TRANSLATED.LABEL_NOT_PROVIDED}</dd>

  <dt>{TRANSLATED.LABEL_WEBSITE_SCOPE}</dt>
  <dd>{scope.siteScope || TRANSLATED.LABEL_NOT_PROVIDED}</dd>

  <dt>{TRANSLATED.LABEL_WCAG_VERSION}</dt>
  <dd>{scope.wcagVersion || TRANSLATED.LABEL_NOT_PROVIDED}</dd>

  <dt>{TRANSLATED.LABEL_CONFORMANCE_TARGET}</dt>
  <dd>{scope.conformanceTarget || TRANSLATED.LABEL_NOT_PROVIDED}</dd>

  <dt>{TRANSLATED.LABEL_EXTRA_REQUIREMENTS}</dt>
  <dd>{scope.extra || TRANSLATED.LABEL_NOT_PROVIDED}</dd>

  <dt>{TRANSLATED.LABEL_ACCESSIBILITY_SUPPORT_BASELINE}</dt>
  <dd>{scope.baseline || TRANSLATED.LABEL_NOT_PROVIDED}</dd>
</dl>

<h2>{TRANSLATED.HEADING_AUDIT_RESULTS_OVERVIEW}</h2>
<p>{report.result || TRANSLATED.LABEL_NOT_PROVIDED}</p>

<h2>{TRANSLATED.HEADING_AUDIT_RESULTS_DETAIL}</h2>
<AuditorSummary criteria="{$tests}" />

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

<h2>{TRANSLATED.HEADING_SPECIFICS}</h2>
<p>{report.specifics || TRANSLATED.LABEL_NOT_PROVIDED}</p>

<h2>{TRANSLATED.HEADING_RESOURCES}</h2>
<p class="info">List resources</p>
<!-- /component -->

<script context="module">
  import { downloadFile } from '@app/scripts/files.js';

  let Report;

  export function downloadReport() {
    downloadFile({
      contents: Report.outerHTML,
      name: 'report.html',
      type: 'text/html'
    });
  }
</script>

<style>
  dt {
    grid-column: 1 / 2;
    margin-top: 0;
    font-weight: normal;
  }
  dt:after {
    content: ":";
  }
  dd {
    font-weight: bold;
    margin-left: 0;
    margin-bottom: 1em;
    grid-column: 2 / 3;
  }
  @media (min-width: 40em) {
    dl {
      display: grid;
      grid-template-columns: auto 2fr;
      gap: 0.5em 1em;
    }
    dd {
      margin-bottom: 0;
    }
  }
  </style>

<script>
  import { getContext } from 'svelte';

  import tests from '@app/stores/earl/testStore/index.js';

  import AuditorSummary from '@app/components/ui/Auditor/AuditorSummary.svelte';

  const { sampleStore, scopeStore, summaryStore, translate } = getContext(
    'app'
  );

  $: TRANSLATED = {
    LABEL_EVALUATOR: $translate('UI.REPORT.BY'),
    LABEL_COMMISSIONER: $translate('UI.REPORT.COMMISION_BY'),
    LABEL_NOT_PROVIDED: $translate('UI.REPORT.LABEL_NOT_PROVIDED'),
    LABEL_DATE: $translate('PAGES.SUMMARY.LABEL_DATE'),
    HEADING_ABOUT: $translate('UI.REPORT.HD_ABOUT'),
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
