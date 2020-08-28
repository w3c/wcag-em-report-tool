<!-- @Component:LanguageSelect -->
<span>Language ({ currentLocale.title })</span>
<ul id="languageSelect" title="languages" on:click={handleClick}>
  {#each locales as locale}
    <li><Link
          to="/{locale.lang}"
          hreflang="{locale.lang}"
          lang="{locale.lang}"
        >{locale.title} {#if locale.lang === defaultLocale.lang}(Default){/if}</Link></li>
  {/each}
</ul>
<!-- /@Component -->

<script>
  import { Link } from 'svelte-navigator';
  import { locale } from 'svelte-i18n';
  import appData from '../../data/app.js';

  let { locales, defaultLocale } = appData;

  $: currentLocale = locales.find(l => l.lang === $locale);

  /**
   * Handle the languageSelect click,
   * Changing to target language
   * @param  {[object]} event [description]
   * @return {undefined}
   */
  function handleClick(event) {
    const target = event.target;

    if (
      target.nodeName === 'A' &&
      locales.some(l => l.lang === target.lang)
    ) {
      // This line is what makes the App translate to another language
      locale.set(target.lang);
    }
  }
</script>
