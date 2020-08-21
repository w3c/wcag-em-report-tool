<!-- @Component:LanguageSelect -->
<span>Language</span>
<ul id="languageSelect" title="languages" on:click={handleClick}>
  {#each locales as locale}
    <li><a
      href="/{locale.lang}/"
      hreflang="{locale.lang}"
      lang="{locale.lang}"
    >{locale.title} {#if locale.lang === defaultLocale.lang}(Default){/if}</a></li>
  {/each}
</ul>
<!-- /@Component -->

<script>
  import { locale } from 'svelte-i18n';
  import appData from '../../../data/app.js';

  let { locales, defaultLocale } = appData;

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
      locale.set(target.lang);
    }
  }
</script>
