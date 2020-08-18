<!-- @Documentation
  * svelte files are pages.
  * They are parsed in context of the client / Browser
  * JavaScript used here is client OR server side.
  * -->

<!--
  * context="module" is rendered before component render
  * Add all data request here to serve to the component
  * -->
<script context="module">
  import appData from '../data/app.js';

  export async function preload(page, session) {

    const locale = appData.defaultLocale;
    let redirectPath;

    // Start serving the defaultLocale
    if (locale) {
      redirectPath = `/${locale.lang}/`;

      /**
       * @NB
       * @TLDR: Good for now...
       * ---
       * [sapper export] generates an html file with only inline script
       * setting window.location to '/${locale}'
       * This needs to be improved! (what if javascript does not execute?)
       * - [1] By adding an .httaccess for example (Let server decide)?
       * - [2] Render the target page as current path (links are still correct, add canonical link pointing to '/${locale}')
       * - [3] Extend the _error.svelte page with redirect status codes?
       * - [4] Create into a redirect page?
       */
      return this.redirect(301, redirectPath);
    }
  }
</script>

<!-- @Page:/ -->
<svelte:head>
  <title>{ title }</title>
</svelte:head>

<h1>{ title }</h1>

<details>
  <summary>
    <h2>What this tool does</h2>
  </summary>
  <p>
    This tool helps you generate a report according to the
    <a href="http://www.w3.org/TR/WCAG-EM/"
      >Website Accessibility Conformance Evaluation Methodology
      (WCAG-EM)</a
    >. It does not perform any accessibility checks. It helps you follow
    the steps of WCAG-EM, to generate a
    <a href="/evaluation/view-report">structured report</a> from the input that you
    provide. It is designed for experienced evaluators who know
    <a href="http://www.w3.org/WAI/standards-guidelines/wcag/"
      >Web Content Accessibility Guidelines (WCAG) 2</a
    >
    and are somewhat familiar with WCAG-EM. For an introduction to
    WCAG-EM, see the
    <a href="http://www.w3.org/WAI/test-evaluate/conformance/wcag-em/"
      >WCAG-EM Overview</a
    >.
  </p>
  <p>
    <strong>Note:</strong> This tool does not automatically save the
    information that you enter. To save your data in a file locally on
    your computer, use Windows shortcut keys Ctrl+S or Mac shortcut keys
    ⌘S to open the Save dialog. (Or the 'Save' link at the top of the page
    will open the Save Evaluation Report page and from there the 'Save
    data file locally to your computer' link will open the Save dialog.)
  </p>
</details>

<details>
  <summary>
    <h2>How this tool works</h2>
  </summary>
  <ul>
    <li>
      All functionality provided by this tool is now loaded and running
      locally in your web browser. You don't need an Internet connection
      beyond this point. When you close your web browser window, any unsaved
      data is lost.
    </li>
    <li>
      All input that you provide through this tool is recorded as JSON data
      in the background (in your web browser, not on any server). You can
      Save periodically as you work to avoid losing data if your web browser
      closes.
    </li>
    <li>
      You can save partially-complete reports and work on them later. To
      reload a saved file, use the 'Open' link at the top and find the file
      that you previously saved.
    </li>
    <li>
      Links that are not part of the navigation or functionality (links to
      external resources) open in a new web browser windows.
    </li>
  </ul>
</details>

<details>
  <summary>
    <h2>Tips for using this tool</h2>
  </summary>
  <ul>
    <li>
      You can go back and forth between the steps in any order. None of the
      fields are required.
    </li>
    <li>
      To get more information about a field, select the
      Info expand icon next to the field label.
    </li>
    <li>
      The tool provides your report as HTML and CSS files. You can download
      these files from the 'View Report' page. You can then change the
      report content and visual design.
    </li>
    <li>
      You can include in your report WCAG 2 success criteria beyond the
      conformance target. For example, the website is only required to meet
      Level AA, yet you want to also include Level AAA success criteria in
      the report. In step 4, use the level filter to show higher level
      criteria. Any criteria with a result will always be included in the
      report.
    </li>
  </ul>
</details>

<a class="button" href="/evaluation/scope/" rel="next">
  Next step: Define Scope
</a>
<!-- /@Page -->

<script>
  import appData from '../data/app.js';

  // @TODO: Find a way to extend / set the title prop from layout
  let title = appData.title;
</script>
