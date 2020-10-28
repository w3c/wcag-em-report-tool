<!--
 * @component
 * LanguageSelect
 * -->
<div class="LanguageSelect">
  {#if !collapsed}
    <span class="LanguageSelect__languages_container languagelist">
      <strong
        id="LanguageSelect__label"
      >{$translate('LANGUAGE_SELECT_LABEL')}:</strong>
      <ul
        class="LanguageSelect__languages languagelistul"
        on:click="{handleClick}"
      >
        {#each locales as appLocale}
          <li
            class="LanguageSelect__language {appLocale === currentLocale ? 'language__item--current' : ''}"
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
    </span>
  {/if}
  <span class="LanguageSelect__toggle">
    <button
      id="showoptions"
      on:click="{handleToggle}"
      type="button"
      class="button-inline showhidebutton"
      aria-expanded="{!collapsed}"
    >
      <svg aria-hidden="true" class="icon-languages"><use
          xlink:href="images/icons.svg#icon-languages"
        ></use></svg>
      <span>
        {collapsed ? 'Show' : 'Hide'}
        {$translate('LANGUAGE_SELECT_BUTTON')}
      </span>
    </button>
  </span>
</div>
<!-- /component -->

<style>
  .LanguageSelect {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .LanguageSelect > *:not(:first-child) {
    margin-left: 0.5rem;
    padding-left: 0.5rem;
    border-left: solid 1px var(--w3c-classic);
  }
</style>

<script>
  import { t as translate, locale } from 'svelte-i18n';

  export let locales = [];

  let collapsed = true;

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

  function handleToggle(event) {
    collapsed = !collapsed;
  }
</script>
