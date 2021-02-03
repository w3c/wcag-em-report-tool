<Page title="{TRANSLATED.PAGE_TITLE}">
  <p>
    {@html TRANSLATED.INTRODUCTION}
  </p>

  <form method="" novalidate>
    <Input
      id="site_name"
      label="{TRANSLATED.SITE_NAME_LABEL}"
      helptext="{TRANSLATED.SITE_NAME_HELPTEXT}"
      bind:value="{$scopeStore['SITE_NAME']}"
    />

    <Textarea
      id="website_scope"
      label="{TRANSLATED.SITE_SCOPE_LABEL}"
      helptext="{`
        <p>${TRANSLATED.SITE_SCOPE_HELPTEXT_P1}</p>
        <ul>
          <li>${TRANSLATED.SITE_SCOPE_HELPTEXT_LI1}</li>
          <li>${TRANSLATED.SITE_SCOPE_HELPTEXT_LI2}</li>
          <li>${TRANSLATED.SITE_SCOPE_HELPTEXT_LI3}</li>
        </ul>
      `}"
      bind:value="{$scopeStore['WEBSITE_SCOPE']}"
    />

    <Select
      id="wcag_version"
      label="{TRANSLATED.WCAG_VERSION_LABEL}"
      helptext="{TRANSLATED.WCAG_VERSION_HELPTEXT}"
      options="{wcagVersions}"
      bind:value="{$scopeStore['WCAG_VERSION']}"
    />

    <Select
      id="conformance_target"
      label="{TRANSLATED.CONFORMANCE_TARGET_LABEL}"
      helptext="{TRANSLATED.CONFORMANCE_TARGET_HELPTEXT}"
      options="{conformanceLevels}"
      bind:value="{$scopeStore['CONFORMANCE_TARGET']}"
    />

    <Textarea
      id="as_baseline"
      label="{TRANSLATED.ACCESSIBILITY_SUPPORT_BASELINE_LABEL}"
      helptext="{TRANSLATED.ACCESSIBILITY_SUPPORT_BASELINE_HELPTEXT}"
      bind:value="{$scopeStore['AS_BASELINE']}"
    />

    <Textarea
      id="additional_requirements"
      label="{TRANSLATED.ADDITIONAL_REQUIREMENTS_LABEL}"
      helptext="{`
        <p>${TRANSLATED.ADDITIONAL_REQUIREMENTS_HELPTEXT_P1}</p>
        <ul>
          <li>${TRANSLATED.ADDITIONAL_REQUIREMENTS_HELPTEXT_LI1}</li>
          <li>${TRANSLATED.ADDITIONAL_REQUIREMENTS_HELPTEXT_LI2}</li>
          <li>${TRANSLATED.ADDITIONAL_REQUIREMENTS_HELPTEXT_LI3}</li>
        </ul>
      `}"
      bind:value="{$scopeStore['ADDITIONAL_REQUIREMENTS']}"
    />
  </form>
</Page>

<script>
  import { getContext } from 'svelte';

  import { CONFORMANCE_LEVELS, VERSIONS} from 'stores/wcagStore.js';

  import Page from 'components/Page.svelte';
  import Input from 'components/formcomponents/Input.svelte';
  import Select from 'components/formcomponents/Select.svelte';
  import Textarea from 'components/formcomponents/Textarea.svelte';

  const { scopeStore, translate } = getContext('app');
  $: TRANSLATED = {
    PAGE_TITLE: $translate('PAGES.SCOPE.TITLE'),
    INTRODUCTION: $translate('PAGES.SCOPE.INTRO'),
    SITE_NAME_LABEL: $translate('PAGES.SCOPE.LABEL_SITE_NAME'),
    SITE_NAME_HELPTEXT: $translate('PAGES.SCOPE.INF_SITE_NAME'),
    SITE_SCOPE_LABEL: $translate('PAGES.SCOPE.LABEL_SITE_SCOPE'),
    SITE_SCOPE_HELPTEXT_P1: $translate('PAGES.SCOPE.INF_SITE_SCOPE_0'),
    SITE_SCOPE_HELPTEXT_LI1: $translate('PAGES.SCOPE.INF_SITE_SCOPE_LI0'),
    SITE_SCOPE_HELPTEXT_LI2: $translate('PAGES.SCOPE.INF_SITE_SCOPE_LI1'),
    SITE_SCOPE_HELPTEXT_LI3: $translate('PAGES.SCOPE.INF_SITE_SCOPE_LI2'),
    WCAG_VERSION_LABEL: $translate('PAGES.SCOPE.LABEL_WCAG_VERSION'),
    WCAG_VERSION_HELPTEXT: $translate('PAGES.SCOPE.INFO_WCAG_VERSION'),
    CONFORMANCE_TARGET_LABEL: $translate('PAGES.SCOPE.LABEL_CONFORMANCE_TGT'),
    CONFORMANCE_TARGET_HELPTEXT: $translate('PAGES.SCOPE.INF_CONF_TGT'),
    ACCESSIBILITY_SUPPORT_BASELINE_LABEL: $translate('PAGES.SCOPE.LABEL_SUPPORT_BASE'),
    ACCESSIBILITY_SUPPORT_BASELINE_HELPTEXT: $translate('PAGES.SCOPE.INF_SUPPORT_BASE'),
    ADDITIONAL_REQUIREMENTS_LABEL: $translate('PAGES.SCOPE.LABEL_EXTRA_REQUIREMENTS'),
    ADDITIONAL_REQUIREMENTS_HELPTEXT_P1: $translate('PAGES.SCOPE.INF_EXTRA_REQUIREMENTS_0'),
    ADDITIONAL_REQUIREMENTS_HELPTEXT_LI1: $translate('PAGES.SCOPE.INF_EXTRA_REQUIREMENTS_LI0'),
    ADDITIONAL_REQUIREMENTS_HELPTEXT_LI2: $translate('PAGES.SCOPE.INF_EXTRA_REQUIREMENTS_LI1'),
    ADDITIONAL_REQUIREMENTS_HELPTEXT_LI3: $translate('PAGES.SCOPE.INF_EXTRA_REQUIREMENTS_LI2'),
    CONFORMANCE_LEVEL: $translate('WCAG.COMMON.CONFORMANCE_LEVEL')
  };


  let wcagVersions = VERSIONS.map((version) => {
    return {
      title: `WCAG ${version}`,
      value: version
    };
  });

  $: conformanceLevels = CONFORMANCE_LEVELS.map((level) => {
    return {
      title: `${TRANSLATED.CONFORMANCE_LEVEL} ${level}`,
      value: level
    };
  });
</script>
