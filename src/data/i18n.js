import { register, init, getLocaleFromPathname } from 'svelte-i18n';

import app from './app.js';

// Asynchronous loading
register('en', () => import('./i18n/en.js'));
register('nl', () => import('./i18n/nl.js'));

init({
  fallbackLocale: app.defaultLocale.lang,
  // language[-region]
  // e.g. /nl-NL/ --> Dutch Netherlands
  // See https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes for language codes
  // See https://en.wikipedia.org/wiki/ISO_3166-1 for region codes
  initialLocale: getLocaleFromPathname(/^\/([a-z]{2})(\-[A-Z]{2})?\//)
});
// starts loading 'en'
