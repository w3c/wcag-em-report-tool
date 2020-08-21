import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

// Asynchronous loading
register('en', () => import('./i18n/en.js'));

init({
  fallbackLocale: 'en',
  initialLocale: getLocaleFromNavigator(),
});
// starts loading 'en'
