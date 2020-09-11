<!-- @Component:LanguageSelect -->
<div class="LanguageSelect">
  <button
    type="button"
    class="LanguageSelect__toggle showhidebutton button-small"
  >{$translate('UI.LANGUAGESELECTOR_BUTTON_NAME', { default: 'Select language' })}
    (<span
      class="visually-hidden"
    >{$translate('UI.LANGUAGESELECTOR_CURRENT_LANGUAGE', {
        default: 'Current language'
      })}:
    </span>{currentLocale.title})</button>
  <ul id="languages--list" title="languages" on:click="{handleClick}">
    {#each locales as appLocale}
      <li
        class="language__item {appLocale === currentLocale ? 'language__item--current' : ''}"
      >
        <a
          lang="{appLocale.lang}"
          href="#language-{appLocale.lang}"
        >{appLocale.title}
          {#if appLocale.lang === defaultLocale.lang}(Default){/if}</a>
      </li>
    {/each}
  </ul>
</div>
<!-- /@Component -->

<style>
  #languages--list {
    display: inline-flex;
    flex-direction: row;
    margin: 0;
    padding: 0;
    list-style-type: none;
    font-size: 0.75em;
  }

  .language__item {
    margin: 0 0.25em;
  }

  .language__item--current > a {
    text-decoration: none;
  }
</style>

<script>
  import { t as translate, locale } from 'svelte-i18n';
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
      target.nodeName === 'A' &&
      locales.some((l) => l.lang === target.lang)
    ) {
      event.preventDefault();

      // This line is what makes the App translate to another language
      locale.set(target.lang);
    }
  }
</script>
