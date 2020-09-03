<Page title="Scope">

  <form method="" novalidate>
    <div class="field">
      <label for="site-name">
        { $translate('SCOPE.LABEL_SITE_NAME', { default: 'Name of the website'}) }
      </label>

      <input type="text" id="site-name" class="form-control">
    </div>

    <div class="field">
      <label for="website_scope">
        { $translate('SCOPE.LABEL_SITE_SCOPE') }
      </label>

      <details>
        <summary>{ $translate('SCOPE.INF_SITE_SCOPE_0') }</summary>
        <ul>
          <li>{ $translate('SCOPE.INF_SITE_SCOPE_LI0') }</li>
          <li>{ $translate('SCOPE.INF_SITE_SCOPE_LI1') }</li>
          <li>{ $translate('SCOPE.INF_SITE_SCOPE_LI2') }</li>
        </ul>
      </details>

      <textarea
      class="form-control" id="website_scope" auto-resize
      cols="40" rows="3"></textarea>
    </div>

    <div class="field">
      <label for="wcag_version">
        { $translate('SCOPE.LABEL_WCAG_VERSION') }
      </label>

      <select id="wcag_version" class="form-control">
        <option value="WCAG22">WCAG 2.2</option>
        <option value="WCAG21" selected>WCAG 2.1</option>
        <option value="WCAG20">WCAG 2.0</option>
      </select>
    </div>

    <div class="field">
      <label for="conformance_target">
        { $translate('SCOPE.LABEL_CONFORMANCE_TGT') }
      </label>

      <select id="conformance_target" class="form-control">
        <option>A</option>
        <option selected>AA</option>
        <option>AAA</option>
      </select>
    </div>

    <div class="field">
      <label for="as_baseline" class="">
        { $translate('SCOPE.LABEL_SUPPORT_BASE') }
      </label>

      <textarea
      id="as_baseline" class="form-control" auto-resize
      cols="40" rows="5"></textarea>
    </div>

    <div class="field">
      <label for="additional_requirements">
        { $translate('SCOPE.LABEL_EXTRA_REQUIREMENTS') }
      </label>

      <details>
        <summary>{ $translate('SCOPE.INF_EXTRA_REQUIREMENTS_0') }</summary>
        <ul>
          <li>{ $translate('SCOPE.INF_EXTRA_REQUIREMENTS_LI0') }</li>
          <li>{ $translate('SCOPE.INF_EXTRA_REQUIREMENTS_LI1') }</li>
          <li>{ $translate('SCOPE.INF_EXTRA_REQUIREMENTS_LI2') }</li>
        </ul>
      </details>

      <textarea
      id="additional_requirements" class="form-control" auto-resize
      cols="40" rows="5"></textarea>
    </div>
  </form>

</Page>

<script>
  import { t as translate } from 'svelte-i18n';

  import Page from '../../Page.svelte';
</script>
