import locales from '../locales/index.json';

const appData = {
  title: 'Web Content Accessibility Guidelines Report Tool',
  id: 'WCAGRT',
  locales
};

appData.defaultLocale = (() => appData.locales[0] || null)();

export default appData;
