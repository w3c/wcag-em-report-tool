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

  <Details label="<h2>{TRANSLATED.USAGE_HEADING}</h2>">
    <ul>
      <li>{TRANSLATED.USAGE_LI1}</li>
      <li>{TRANSLATED.USAGE_LI2}</li>
      <li>{TRANSLATED.USAGE_LI3}</li>
    </ul>
  </Details>

  <Details label="<h2>{TRANSLATED.TIPS_HEADING}</h2>">
    <ol>
      <li>{TRANSLATED.TIPS_LI1}</li>
      <li>{TRANSLATED.TIPS_LI2}</li>
      <li>{TRANSLATED.TIPS_LI3}</li>
      <li>{TRANSLATED.TIPS_LI4}</li>
    </ol>
  </Details>
</Page>
<!-- /component -->

<script>
  import { getContext } from 'svelte';

  import Details from '@app/components/Details.svelte';
  import Page from '@app/components/Page.svelte';

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
