<!--
 * @component
 *   OverviewPage
 * -->
<Page title="{TRANSLATED.PAGE_TITLE}">
  <p>
    {@html TRANSLATED.INTRODUCTION_P1}
  </p>
  <p>
    {@html TRANSLATED.INTRODUCTION_P2}
  </p>

  <details>
    <summary><h2>{TRANSLATED.USAGE_HEADING}</h2></summary>
    <ul>
      <li>{TRANSLATED.USAGE_LI1}</li>
      <li>{TRANSLATED.USAGE_LI2}</li>
      <li>{TRANSLATED.USAGE_LI3}</li>
    </ul>
  </details>

  <details>
    <summary><h2>{TRANSLATED.TIPS_HEADING}</h2></summary>
    <ol>
      <li>{TRANSLATED.TIPS_LI1}</li>
      <li>{TRANSLATED.TIPS_LI2}</li>
      <li>{TRANSLATED.TIPS_LI3}</li>
      <li>{TRANSLATED.TIPS_LI4}</li>
    </ol>
  </details>
</Page>
<!-- /component -->

<script>
  import { getContext } from 'svelte';

  import Page from '@app/components/ui/Page.svelte';

  const { translate } = getContext('app');

  $: TRANSLATED = {
    PAGE_TITLE: $translate('PAGES.START.SUBTITLE'),
    INTRODUCTION_P1: $translate('PAGES.START.INTRO_1'),
    INTRODUCTION_P2: $translate('PAGES.START.INTRO_2'),
    USAGE_HEADING: $translate('PAGES.START.USAGE_HD'),
    USAGE_LI1: $translate('PAGES.START.USAGE_LI1'),
    USAGE_LI2: $translate('PAGES.START.USAGE_LI2'),
    USAGE_LI3: $translate('PAGES.START.USAGE_LI3'),
    TIPS_HEADING: $translate('PAGES.START.TIPS_HD'),
    TIPS_LI1: $translate('PAGES.START.TIPS_LI1'),
    TIPS_LI2: $translate('PAGES.START.TIPS_LI2'),
    TIPS_LI3: $translate('PAGES.START.TIPS_LI3'),
    TIPS_LI4: $translate('PAGES.START.TIPS_LI4')
  };
</script>
