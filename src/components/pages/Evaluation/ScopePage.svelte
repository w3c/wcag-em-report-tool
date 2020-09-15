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


    <Field id="wcag_version" label="{$translate('SCOPE.LABEL_WCAG_VERSION')}">
      <select id="wcag_version" class="form-control">
        <option value="WCAG22">WCAG 2.2</option>
        <option value="WCAG21" selected>WCAG 2.1</option>
        <option value="WCAG20">WCAG 2.0</option>
      </select>
    </Field>

    <Field
      id="conformance_target"
      label="{$translate('SCOPE.LABEL_CONFORMANCE_TGT')}"
    >
      <select id="conformance_target" class="form-control">
        <option>A</option>
        <option selected>AA</option>
        <option>AAA</option>
      </select>
    </Field>

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
  import Field from '../../formcomponents/Field.svelte';
  import Input from '../../formcomponents/Input.svelte';
  import Textarea from '../../formcomponents/Textarea.svelte';
</script>
