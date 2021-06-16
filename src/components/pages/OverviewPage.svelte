<!--
 * @component
 *   OverviewPage
 * -->
<Page title="{TRANSLATED.PAGE_TITLE}">
  <p>
    {@html TRANSLATED.INTRODUCTION_P1}
  </p>
  {@html TRANSLATED.INTRODUCTION_P2}

  <details>
    <summary><h2>{TRANSLATED.ABOUT_HEADING}</h2></summary>
    {@html TRANSLATED.ABOUT_1}
    {@html TRANSLATED.ABOUT_2}
  </details>

  <details>
    <summary><h2>{TRANSLATED.USAGE_HEADING}</h2></summary>
    <ul>
      <li>{TRANSLATED.USAGE_LI1}</li>
      <li>{TRANSLATED.USAGE_LI2}</li>
      <li>{TRANSLATED.USAGE_LI3}</li>
      <li>{@html TRANSLATED.USAGE_LI4}</li>
    </ul>
  </details>

  <details>
    <summary><h2>{TRANSLATED.CHOICES_HEADING}</h2></summary>
    <p>{TRANSLATED.CHOICES_INTRO}</p>
    <dl>
      <dt>{TRANSLATED.CHOICES_DT1}</dt>
      <dd>{TRANSLATED.CHOICES_DD1}</dd>
      <dt>{TRANSLATED.CHOICES_DT2}</dt>
      <dd>{TRANSLATED.CHOICES_DD2}</dd>
      <dt>{TRANSLATED.CHOICES_DT3}</dt>
      <dd>{TRANSLATED.CHOICES_DD3}</dd>
      <dt>{TRANSLATED.CHOICES_DT4}</dt>
      <dd>{TRANSLATED.CHOICES_DD4}</dd>
      <dt>{TRANSLATED.CHOICES_DT5}</dt>
      <dd>{TRANSLATED.CHOICES_DD5}</dd>
    </dl>
  </details>
</Page>
<!-- /component -->

<script>
  import { getContext } from 'svelte';

  import Page from '@app/components/ui/Page.svelte';

  const { translate } = getContext('app');

  $: TRANSLATED = {
    BUTTON_NEW_EVALUATION: $translate('UI.NAV.MENU_NEW', {
      default: 'New report'
    }),
    PAGE_TITLE: $translate('PAGES.START.SUBTITLE'),
    INTRODUCTION_P1: $translate('PAGES.START.INTRO_1'),
    INTRODUCTION_P2: $translate('PAGES.START.INTRO_2'),
    USAGE_HEADING: $translate('PAGES.START.USAGE_HD'),
    USAGE_LI1: $translate('PAGES.START.USAGE_LI1'),
    USAGE_LI2: $translate('PAGES.START.USAGE_LI2'),
    USAGE_LI3: $translate('PAGES.START.USAGE_LI3'),
    USAGE_LI4: $translate('PAGES.START.USAGE_LI4'),
    ABOUT_HEADING: $translate('PAGES.START.ABOUT_HEADING'),
    ABOUT_1: $translate('PAGES.START.ABOUT_1'),
    ABOUT_2: $translate('PAGES.START.ABOUT_2'),
    CHOICES_HEADING: $translate('PAGES.START.CHOICES_HEADING'),
    CHOICES_INTRO: $translate('PAGES.START.CHOICES_INTRO'),
    CHOICES_DT1: $translate('PAGES.START.CHOICES_DT1'),
    CHOICES_DD1: $translate('PAGES.START.CHOICES_DD1'),
    CHOICES_DT2: $translate('PAGES.START.CHOICES_DT2'),
    CHOICES_DD2: $translate('PAGES.START.CHOICES_DD2'),
    CHOICES_DT3: $translate('PAGES.START.CHOICES_DT3'),
    CHOICES_DD3: $translate('PAGES.START.CHOICES_DD3'),
    CHOICES_DT4: $translate('PAGES.START.CHOICES_DT4'),
    CHOICES_DD4: $translate('PAGES.START.CHOICES_DD4'),
    CHOICES_DT5: $translate('PAGES.START.CHOICES_DT5'),
    CHOICES_DD5: $translate('PAGES.START.CHOICES_DD5')
  };
</script>
