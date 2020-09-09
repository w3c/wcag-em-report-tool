import App from './App.svelte';
import './data/i18n.js';

/**
 * See for options:
 * https://svelte.dev/docs#Creating_a_component
 */
new App({
  target: document.getElementById('wcag-rt'),
  props: {
    // Replaced string, see rollup.config.json replace plugin.
    basepath: '__BASEPATH__'
  }
});
