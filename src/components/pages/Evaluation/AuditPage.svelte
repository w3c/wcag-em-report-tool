<Page title="{$translate('AUDIT.TITLE')}">
  <p>{$translate('AUDIT.INTRO')}</p>

  <div>
    'AUDIT.BTN_SHOW_TEXT' "AUDIT.NOTE" "AUDIT.UNDERSTAND" "AUDIT.HOW_TO"
    'AUDIT.SAMPLE_FINDINGS' 'AUDIT.BTN_EXPAND_PAGES' 'AUDIT.BTN_COLLAPSE_PAGES'
  </div>

  <div>
    {'spec.num'}
    {'spec.handle'}
    {'spec.text'}
    {'item.handle'}
    {'item.text'}
    {'item.handle'}
    {'item.text'}
    {'details.text'}
    {'spec.number'}
    {'spec.number'}
  </div>

  <p class="info">Auditor</p>

  <div>
    <ul>
      <li>
        <div>
          <header>
            <h3><span>test.number</span> test.title</h3>
            <span>(test.conformanceLevel)</span>
          </header>

          <div>
            <details>
              <summary>
                <h4>Show test.title details</h4>
              </summary>
              <div>test.description.introduction</div>
              <span>test.description.details</span>
              <dl>
                <dt>detail.title</dt>
                <dd>
                  <p>detail.description</p>
                  <p class="note">detail.note</p>
                </dd>
              </dl>
              <div>
                <span>test.description.notes</span>
                <ol>
                  <li>
                    <p class="note"><span>Note:</span> <span>note</span></p>
                  </li>
                </ol>
              </div>
            </details>
          </div>
        </div>

        <div>
          <span>subject.type?</span>: <span>subject.title</span> - (<span
          >subject.url</span>)
        </div>

        <div>
          <div>result.outcome</div>
          <div>result.description</div>
        </div>
      </li>
    </ul>
  </div>
</Page>

<Panel title="Auditor menu">
  <p>Some auditing tools...</p>
  <p>Filter by:</p>
  <ul>
    <li>WCAG version</li>
    <li>Conformance level</li>
  </ul>
  <button type="button" class="button-secondary">Import findings</button>
</Panel>

<script>
  import { t as translate } from 'svelte-i18n';

  import Page from '../../Page.svelte';
  import Panel from '../../Panel.svelte';
</script>
