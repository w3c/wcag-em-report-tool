<Page title="{$translate('PAGES.SCOPE.TITLE')}">
  <p>
    {@html $translate('PAGES.SCOPE.INTRO')}
  </p>

  <form method="" novalidate>
    <Input
      id="site_name"
      label="{$translate('PAGES.SCOPE.LABEL_SITE_NAME')}"
      bind:value="{$scopeStore['SITE_NAME']}"
    />

    <Textarea
      id="website_scope"
      label="{$translate('PAGES.SCOPE.LABEL_SITE_SCOPE')}"
      helptext="{`
        <p>${$translate('PAGES.SCOPE.INF_SITE_SCOPE_0')}</p>
        <ul>
          <li>${$translate('PAGES.SCOPE.INF_SITE_SCOPE_LI0')}</li>
          <li>${$translate('PAGES.SCOPE.INF_SITE_SCOPE_LI1')}</li>
          <li>${$translate('PAGES.SCOPE.INF_SITE_SCOPE_LI2')}</li>
        </ul>
      `}"
      bind:value="{$scopeStore['WEBSITE_SCOPE']}"
    />

    <Select
      id="wcag_version"
      label="{$translate('PAGES.SCOPE.LABEL_WCAG_VERSION')}"
      options="{[{ value: 'WCAG22', title: 'WCAG 2.2' }, { value: 'WCAG21', title: 'WCAG 2.1', selected: true }, { value: 'WCAG20', title: 'WCAG 2.0' }]}"
      bind:value="{$scopeStore['WCAG_VERSION']}"
    />

    <Select
      id="conformance_target"
      label="{$translate('PAGES.SCOPE.LABEL_CONFORMANCE_TGT')}"
      options="{['A', { title: 'AA', selected: true }, 'AAA']}"
      bind:value="{$scopeStore['CONFORMANCE_TARGET']}"
    />

    <Textarea
      id="as_baseline"
      label="{$translate('PAGES.SCOPE.LABEL_SUPPORT_BASE')}"
      bind:value="{$scopeStore['AS_BASELINE']}"
    />

    <Textarea
      id="additional_requirements"
      label="{$translate('PAGES.SCOPE.LABEL_EXTRA_REQUIREMENTS')}"
      helptext="{`
        <p>${$translate('PAGES.SCOPE.INF_EXTRA_REQUIREMENTS_0')}</p>
        <ul>
          <li>${$translate('PAGES.SCOPE.INF_EXTRA_REQUIREMENTS_LI0')}</li>
          <li>${$translate('PAGES.SCOPE.INF_EXTRA_REQUIREMENTS_LI1')}</li>
          <li>${$translate('PAGES.SCOPE.INF_EXTRA_REQUIREMENTS_LI2')}</li>
        </ul>
      `}"
      bind:value="{$scopeStore['ADDITIONAL_REQUIREMENTS']}"
    />
  </form>
</Page>

<script>
  import scopeStore from '../../../data/stores/scopeStore.js';
  import { t as translate } from 'svelte-i18n';

  import Page from '../../Page.svelte';
  import Input from '../../formcomponents/Input.svelte';
  import Select from '../../formcomponents/Select.svelte';
  import Textarea from '../../formcomponents/Textarea.svelte';
</script>
