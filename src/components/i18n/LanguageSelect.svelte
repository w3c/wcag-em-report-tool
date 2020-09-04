<!-- @Component:LanguageSelect -->
<span>Language ({currentLocale.title})</span>
<ul id="languageSelect" title="languages" on:click="{handleClick}">
  {#each locales as appLocale}
    <li>
      <button
        type="button"
        class="button button-{appLocale === currentLocale ? 'secondary' : 'primary'}"
        lang="{appLocale.lang}"
      >{appLocale.title}
        {#if appLocale.lang === defaultLocale.lang}(Default){/if}</button>
    </li>
  {/each}
</ul>
<!-- /@Component -->

<style>
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
</style>

<script>
  import { locale } from 'svelte-i18n';
  import appData from '../../data/app.js';

  let { locales, defaultLocale } = appData;

  $: currentLocale = locales.find((l) => l.lang === $locale);

  /**
   * Handle the languageSelect click,
   * Changing to target language
   * @param  {[object]} event [description]
   * @return {undefined}
   */
  function handleClick(event) {
    const target = event.target;

    if (
      target.nodeName === 'BUTTON' &&
      locales.some((l) => l.lang === target.lang)
    ) {
      // This line is what makes the App translate to another language
      locale.set(target.lang);
    }
  }
</script>
