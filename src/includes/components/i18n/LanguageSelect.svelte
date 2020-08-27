<!-- @Component:LanguageSelect -->
<span>Language</span>
<ul id="languageSelect" title="languages">
  {#each locales as locale}
    <li><a
      href="/{locale.lang}"
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
</script>
