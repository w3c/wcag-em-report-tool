<!-- @Component:Menubar-->
<nav title="menu bar">
  <ul>
    <li>
      <a href="/" target="_blank">
        New report
      </a>
    </li>
    <li>
      <a href="#open">
        { data.open }
      </a>
    </li>
    <li>
      <a href="#save">
        { data.save }
      </a>
    </li>
    <li>
      <a href="#import" title="Start EARL report import wizzard">
        { data.import }
      </a>
    </li>
    <li>
      <p>{ data.resources }</p>
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
      <p>{ data.language }</p>
      <LanguageSelect />
    </li>
  </ul>
</nav>
<!-- /@Component -->

<script>
  import LanguageSelect from './i18n/LanguageSelect.svelte';

  let data = {
    open: 'Open',
    save: 'Save',
    import: 'Import',
    resources: 'Resources',
    language: 'Language'
  };
</script>
