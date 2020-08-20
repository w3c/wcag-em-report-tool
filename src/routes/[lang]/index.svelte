<script context="module">
  /**
   * Using this script to import content data and push forward to component
   */

  import i18n from '../../data/i18n/index.js';
  import appData from '../../data/app.js';

  export async function preload(page, session) {

    const {
      lang
    } = page.params;
    const {
      locales,
      defaultLocale
    } = appData;
    const isLocale = locales.some(oLocale => oLocale.lang === lang);

    if (isLocale) {

      let pageData = true ?
        i18n[lang].pages.home :
        i18n[defaultLocale].pages.home;
      pageData.translated = true;

      pageData.locale = locales
        .find(oLocale => oLocale.lang === lang) || defaultLocale;

      return {
        page: pageData
      };
    }
  }
</script>

<!--
 * @Page:/[lang]/
 * This is a "dynamic page" if you have a link or path like this:
 * `/en/index.svelte`
 * page.params will have a variable called locale with value 'en'
 * We can use this to set other vars or get data based on the locale.
 * -->
<Page {title}>
  {#each sections as section, index }
    <details open={index === 0}>
      <summary><h2>{ section.title }</h2></summary>
      {#if section.tag === "p"}
        {#each section.contents as content}
          <p>{@html content}</p>
        {/each}
      {:else if section.tag === "ul"}
        <ul>
        {#each section.contents as content}
          <li>{@html content}</li>
        {/each}
        </ul>
      {/if}

    </details>
  {/each}
</Page>
<!-- /@Page -->

<script>
  import Page from '../../includes/components/Page.svelte';
  export let page;

  $: title = page.title;
  $: locale = page.locale;
  $: nextPage = {
    href: `/${page.locale.lang}/evaluation/scope/`
  };
  $: translated = page.translated;
  $: sections = [
    {
      tag: 'p',
      ...page.description
    },
    {
      tag: 'ul',
      ...page.usage
    },
    {
      tag: 'ul',
      ...page.tips
    }
  ];

  // @TODO: Find a way to extend / set the title prop from layout
</script>
