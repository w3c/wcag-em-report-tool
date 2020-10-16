<!--
 * @component
 * Start: /
 * -->
<Page title="{$translate('PAGES.START.SUBTITLE')}">
  <p>
    {@html $translate('PAGES.START.INTRO_1', { values: links })}
  </p>
  <p>
    {@html $translate('PAGES.START.INTRO_2')}
  </p>

  <Details label="<h2>{$translate('PAGES.START.USAGE_HD')}</h2>">
    <p class="info"><strong>Editor's note</strong>: Requires a rewrite.</p>
    <ul>
      <li>{$translate('PAGES.START.USAGE_LI1')}</li>
      <li>{$translate('PAGES.START.USAGE_LI2')}</li>
      <li>{$translate('PAGES.START.USAGE_LI3')}</li>
    </ul>
  </Details>

  <Details label="<h2>{$translate('PAGES.START.TIPS_HD')}</h2>">
    <p class="info"><strong>Editor's note</strong>: Requires a rewrite.</p>
    <ol>
      <li>{$translate('PAGES.START.TIPS_LI1')}</li>
      <li>{$translate('PAGES.START.TIPS_LI2')}</li>
      <li>{$translate('PAGES.START.TIPS_LI3')}</li>
      <li>{$translate('PAGES.START.TIPS_LI4')}</li>
    </ol>
  </Details>
</Page>
<!-- /component -->

<script>
  import { t as translate } from 'svelte-i18n';

  import Details from '../Details.svelte';
  import Page from '../Page.svelte';

  // @todo: Add these links the locales
  // (They might be used on another page)
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
