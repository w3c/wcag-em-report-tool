import { derived } from 'svelte/store';
import { t } from 'svelte-i18n';
import markdown from 'marked';

export const translate = derived(
  [t],
  ([$t]) => {
    return (key, options) => {
      const translated = $t(key, options);

      return markdown.parseInline(translated);
    };
  }
);
