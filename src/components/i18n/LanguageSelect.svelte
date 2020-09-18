<!--
 * @component
 * LanguageSelect
 * -->
<div class="LanguageSelect languagelist">
  <svg aria-hidden="true" class="icon-languages"><use
      xlink:href="images/icons.svg#icon-languages"
    ></use></svg><strong
    id="LanguageSelect__label"
  >{$translate('LANGUAGE_SELECT_LABEL')}:</strong>
  <ul class="languagelistul" on:click="{handleClick}">
    {#each locales as appLocale}
      <li
        class="language__item {appLocale === currentLocale ? 'language__item--current' : ''}"
      >
        {#if appLocale === currentLocale}
          <strong>{currentLocale.title}</strong>
        {:else}
          <a
            lang="{appLocale.lang}"
            href="#{appLocale.lang}"
          >{appLocale.title}</a>
        {/if}
      </li>
    {/each}
  </ul>
</div>
<!-- /component -->

<style>
  .LanguageSelect {
    grid-column: 2 / 10;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin: 0;
    padding: 0.5em 0;
    list-style-type: none;
}

  .language__item {
    margin: 0 0.25em;
    min-width: 3rem;
  }

  .language__item--current > a {
    text-decoration: underline;
    font-weight: bold;
  }
</style>

<script>
  import { t as translate, locale } from 'svelte-i18n';
  import appData from '../../data/app.js';

  let { locales } = appData;

  $: currentLocale = locales.find((l) => l.lang === $locale);

  /**
   * Handle the languageSelect click,
   * Changing to target language
   * @param  {[object]} event
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
