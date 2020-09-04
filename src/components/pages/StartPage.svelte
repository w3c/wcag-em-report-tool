<!--
 * @Page:Start
 * @Route:/
 * -->
<Page title="{$translate('start.SUBTITLE')}">
  <details open="true">
    <summary>
      <h2>{$translate('start.INTRO_HD')}</h2>
    </summary>
    <p>
      {@html $translate('start.INTRO_1', { values: links })}
    </p>
    <p>{$translate('start.INTRO_2')}</p>
  </details>

  <details>
    <summary>
      <h2>{$translate('start.USAGE_HD')}</h2>
    </summary>
    <ul>
      <li>{$translate('start.USAGE_LI1')}</li>
      <li>{$translate('start.USAGE_LI2')}</li>
      <li>{$translate('start.USAGE_LI3')}</li>
    </ul>
  </details>

  <details>
    <summary>
      <h2>{$translate('start.TIPS_HD')}</h2>
    </summary>
    <ol>
      <li>{$translate('start.TIPS_LI1')}</li>
      <li>{$translate('start.TIPS_LI2')}</li>
      <li>{$translate('start.TIPS_LI3')}</li>
      <li>{$translate('start.TIPS_LI4')}</li>
    </ol>
  </details>
</Page>
<!-- /@Page -->

<script>
  import { t as translate } from 'svelte-i18n';

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
