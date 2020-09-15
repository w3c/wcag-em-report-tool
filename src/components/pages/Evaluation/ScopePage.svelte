<Page title="{$translate('SCOPE.TITLE')}">
  <p>{$translate('SCOPE.INTRO')}</p>

  <form method="" novalidate>
    <Input id="site_name" label="{$translate('SCOPE.LABEL_SITE_NAME')}"/>

    <Field id="website_scope" label="{$translate('SCOPE.LABEL_SITE_SCOPE')}">
      <details>
        <summary>{$translate('SCOPE.INF_SITE_SCOPE_0')}</summary>
        <ul>
          <li>{$translate('SCOPE.INF_SITE_SCOPE_LI0')}</li>
          <li>{$translate('SCOPE.INF_SITE_SCOPE_LI1')}</li>
          <li>{$translate('SCOPE.INF_SITE_SCOPE_LI2')}</li>
        </ul>
      </details>

      <textarea
        class="form-control"
        id="website_scope"
        auto-resize
        cols="40"
        rows="3"
      ></textarea>
    </Field>

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

    <Field id="as_baseline" label="{$translate('SCOPE.LABEL_SUPPORT_BASE')}">
      <textarea
        id="as_baseline"
        class="form-control"
        auto-resize
        cols="40"
        rows="5"
      ></textarea>
    </Field>

    <Field
      id="additional_requirements"
      label="{$translate('SCOPE.LABEL_EXTRA_REQUIREMENTS')}"
    >
      <details>
        <summary>{$translate('SCOPE.INF_EXTRA_REQUIREMENTS_0')}</summary>
        <ul>
          <li>{$translate('SCOPE.INF_EXTRA_REQUIREMENTS_LI0')}</li>
          <li>{$translate('SCOPE.INF_EXTRA_REQUIREMENTS_LI1')}</li>
          <li>{$translate('SCOPE.INF_EXTRA_REQUIREMENTS_LI2')}</li>
        </ul>
      </details>

      <textarea
        id="additional_requirements"
        class="form-control"
        auto-resize
        cols="40"
        rows="5"
      ></textarea>
    </Field>
  </form>
</Page>

<script>
  import { t as translate } from 'svelte-i18n';

  import Page from '../../Page.svelte';
  import Field from '../../formcomponents/Field.svelte';
  import Input from '../../formcomponents/Input.svelte';
</script>
