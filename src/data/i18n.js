import { register, init } from 'svelte-i18n';

import app from './app.js';

// Asynchronous loading
register('en', () => import('../locales/_en.json'));
register('nl', () => import('../locales/_nl.json'));

init({
  fallbackLocale: app.defaultLocale.lang,
  // language[-region]
  // e.g. /nl-NL/ --> Dutch Netherlands
  // See https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes for language codes
  // See https://en.wikipedia.org/wiki/ISO_3166-1 for region codes
  // initialLocale: getLocaleFromPathname(/^\/([a-z]{2})(\-[A-Z]{2})?\//)
  initialLocale: 'en'

});
// starts loading 'en'
