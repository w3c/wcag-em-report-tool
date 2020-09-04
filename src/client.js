import App from './App.svelte';
import './data/i18n.js';

/**
 * See for options:
 * https://svelte.dev/docs#Creating_a_component
 */
const WCAGRT = new App({
  target: document.getElementById('wcag-rt')
});
