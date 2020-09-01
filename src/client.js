import App from './App.svelte';
import './data/i18n.js';

const WCAGRT = new App({
  target: document.getElementById('wcag-rt')
  // See for other options:
  // https://svelte.dev/docs#Creating_a_component
});
