<Page title="{$translate('SCOPE.TITLE')}">
  <p>{$translate('SCOPE.INTRO')}</p>

  <form method="" novalidate>
    <Input id="site_name" label="{$translate('SCOPE.LABEL_SITE_NAME')}"/>

    <Textarea id="website_scope" label="{$translate('SCOPE.LABEL_SITE_SCOPE')}" helptext={[
      $translate('SCOPE.INF_SITE_SCOPE_0'),
      $translate('SCOPE.INF_SITE_SCOPE_LI0'),
      $translate('SCOPE.INF_SITE_SCOPE_LI1'),
      $translate('SCOPE.INF_SITE_SCOPE_LI2')
    ]}></Textarea>

    <Select id="wcag_version" label="{$translate('SCOPE.LABEL_WCAG_VERSION')}" options={[
        {
          value: 'WCAG22',
          title: 'WCAG 2.2'
        },
        {
          value: 'WCAG21',
          title: 'WCAG 2.1',
          selected: true
        },
        {
          value: 'WCAG20',
          title: 'WCAG 2.0'
        }
      ]}
    />

    <Select
      id="conformance_target"
      label="{$translate('SCOPE.LABEL_CONFORMANCE_TGT')}"
      options={[
        'A',
        {
          title: 'AA',
          selected: true
        },
        'AAA'
      ]}
    />

    <Textarea
      id="as_baseline"
      label="{$translate('SCOPE.LABEL_SUPPORT_BASE')}"
    />

    <Textarea
      id="additional_requirements"
      label="{$translate('SCOPE.LABEL_EXTRA_REQUIREMENTS')}"
      helptext={[
        $translate('SCOPE.INF_EXTRA_REQUIREMENTS_0'),
        $translate('SCOPE.INF_EXTRA_REQUIREMENTS_LI0'),
        $translate('SCOPE.INF_EXTRA_REQUIREMENTS_LI1'),
        $translate('SCOPE.INF_EXTRA_REQUIREMENTS_LI2')
      ]}
    />
  </form>
</Page>

<script>
  import { t as translate } from 'svelte-i18n';

  import Page from '../../Page.svelte';
  import Input from '../../formcomponents/Input.svelte';
  import Select from '../../formcomponents/Select.svelte';
  import Textarea from '../../formcomponents/Textarea.svelte';
</script>
