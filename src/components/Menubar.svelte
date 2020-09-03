<!-- @Component:Menubar-->
<nav title="menu bar">
  <ul>
    <li>
      <Link to="/evaluation/scope">
        { $translate('MENUBAR.MENU_NEW', { default: 'New report' }) }
      </Link>
    </li>
    <li>
      <a href="#open">
        { $translate('MENUBAR.MENU_OPEN', { default: 'Open' }) }
      </a>
    </li>
    <li>
      <a href="#save">
        { $translate('MENUBAR.MENU_SAVE', { default: 'Save' }) }
      </a>
    </li>
    <li>
      <a href="#import" title="Start EARL report import wizzard">
        { $translate('MENUBAR.MENU_IMPORT', { default: 'Import' }) }
      </a>
    </li>
    <li>
      <p>
        { $translate('MENUBAR.MENU_RESOURCES', { default: 'Key resources' }) }
      </p>
      <ul>
        <li>
          <a
            target="_blank"
            href="http://www.w3.org/WAI/standards-guidelines/wcag/"
          >
            Web Content Accessibility Guidelines (WCAG)
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="http://www.w3.org/WAI/WCAG21/quickref/"
          >
            How to Meet WCAG 2.1 Quick Reference
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="http://www.w3.org/WAI/test-evaluate/conformance/wcag-em/"
          >
            WCAG Evaluation Methodology (WCAG-EM)
          </a>
        </li>
      </ul>
    </li>
    <li>
      <LanguageSelect />
    </li>
  </ul>
</nav>
<!-- /@Component -->

<script>
  import { t as translate } from 'svelte-i18n';
  import { Link } from 'svelte-navigator';
  import LanguageSelect from './i18n/LanguageSelect.svelte';
</script>
