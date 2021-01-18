<!--
 * @component
 *   OverviewPage
 * -->
<Page title="{PAGE_TITLE}">
  <p>
    {@html INTRODUCTION_P1}
  </p>
  <p>
    {@html INTRODUCTION_P2}
  </p>

  <Details label="<h2>{USAGE_HEADING}</h2>">
    <ul>
      <li>{USAGE_LI1}</li>
      <li>{USAGE_LI2}</li>
      <li>{USAGE_LI3}</li>
    </ul>
  </Details>

  <Details label="<h2>{TIPS_HEADING}</h2>">
    <ol>
      <li>{TIPS_LI1}</li>
      <li>{TIPS_LI2}</li>
      <li>{TIPS_LI3}</li>
      <li>{TIPS_LI4}</li>
    </ol>
  </Details>
</Page>
<!-- /component -->

<script>
  import { getContext } from 'svelte';

  import Details from '../Details.svelte';
  import Page from '../Page.svelte';

  const { translate } = getContext('app');
  $: PAGE_TITLE = $translate('PAGES.START.SUBTITLE');
  $: INTRODUCTION_P1 = $translate('PAGES.START.INTRO_1', { values: links });
  $: INTRODUCTION_P2 = $translate('PAGES.START.INTRO_2');
  $: USAGE_HEADING = $translate('PAGES.START.USAGE_HD');
  $: USAGE_LI1 = $translate('PAGES.START.USAGE_LI1');
  $: USAGE_LI2 = $translate('PAGES.START.USAGE_LI2');
  $: USAGE_LI3 = $translate('PAGES.START.USAGE_LI3');
  $: TIPS_HEADING = $translate('PAGES.START.TIPS_HD');
  $: TIPS_LI1 = $translate('PAGES.START.TIPS_LI1');
  $: TIPS_LI2 = $translate('PAGES.START.TIPS_LI2');
  $: TIPS_LI3 = $translate('PAGES.START.TIPS_LI3');
  $: TIPS_LI4 = $translate('PAGES.START.TIPS_LI4');

  // @todo: Add these links the locales
  // (They might be used on another page)
  // or... use markdown inside translations...
  $: links = {
    link_wcag:
      '<a href="http://www.w3.org/WAI/standards-guidelines/wcag/">Web Content Accessibility Guidelines (WCAG) 2</a>',
    link_wcagem:
      '<a href="http://www.w3.org/TR/WCAG-EM/">Web Content Accessibility Guidelines Evaluation Methodology</a>',
    link_wcagem_overview:
      '<a href="http://www.w3.org/WAI/test-evaluate/conformance/wcag-em/">WCAG-EM Overview</a>',
    link_report_example:
      '<a href="/evaluation/report/example/">structured report (example)</a>'
  };
</script>
