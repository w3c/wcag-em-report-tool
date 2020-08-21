<!--
 * @Page:/[lang]/
 * This is a "dynamic page" if you have a link or path like this:
 * `/en/index.svelte`
 * page.params will have a variable called locale with value 'en'
 * We can use this to set other vars or get data based on the locale.
 * -->
<Page title={ $translate('start.SUBTITLE') }>

  <details open="true">
    <summary><h2>{ $translate('start.INTRO_HD') }</h2></summary>
    <p>{ $translate('start.INTRO_1', { values: links}) }</p>
    <p>{ $translate('start.INTRO_2') }</p>
  </details>

  <details>
    <summary><h2>{ $translate('start.USAGE_HD') }</h2></summary>
    <ul>
      <li>{ $translate('start.USAGE_LI1') }</li>
      <li>{ $translate('start.USAGE_LI2') }</li>
      <li>{ $translate('start.USAGE_LI3') }</li>
    </ul>
  </details>

  <details>
    <summary><h2>{ $translate('start.TIPS_HD') }</h2></summary>
    <ol>
      <li>{ $translate('start.TIPS_LI1') }</li>
      <li>{ $translate('start.TIPS_LI2') }</li>
      <li>{ $translate('start.TIPS_LI3') }</li>
      <li>{ $translate('start.TIPS_LI4') }</li>
    </ol>
  </details>

</Page>
<!-- /@Page -->

<script>
  import { t as translate, locale } from 'svelte-i18n';

  import Page from '../../includes/components/Page.svelte';

  $: links = {
    link_wcag: `<a href="#wcagem">Web Content Accessibility Guidelines Evaluation Methodology</a>`,
    link_wcagem: `<a href="#wcagem">Web Content Accessibility Guidelines Evaluation Methodology</a>`,
    link_wcagem_overview: `<a href="#wcagem">Web Content Accessibility Guidelines Evaluation Methodology</a>`,
    link_report_example: `<a href="#wcagem">Web Content Accessibility Guidelines Evaluation Methodology</a>`
  };
</script>
