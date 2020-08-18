const appData = {
  title: 'Web Content Accessibility Guidelines Report Tool',
  id: 'WCAGRT',
  locales: [
    {
      lang: 'en',
      title: 'English'
    },
    {
      lang: 'nl',
      title: 'Nederlands'
    }
  ]
};

appData.defaultLocale = (() => appData.locales[0] || null)();

export default appData;
