# Translations (Internationalization - I18n)

Translation files can be found at `src/locales`.

...Registering your translation (locale)...

## Translation message format

See [FormatJS](https://formatjs.io/) for information on message formatting. The translation plugin we use, [svelte-i18n](https://github.com/kaisermann/svelte-i18n), uses FormatJS under the hood.

It comes down to writing key: value pairs like this:

```json
{
  "PLAIN_KEY": "Evaluation report",
  "KEY_WITH_VARIABLES": "You are targeting WCAG {WCAG_VERSION} level {CONFORMANCE_TARGET} conformance."
}
```

## WCAG related translations

If you have helped with translating this application in previous versions, then this information is for you.

The new way to get the WCAG contents translated, is using the same translation method used as with other translations. Previous versions required you to translate the wcag specification in another place.

The format of the new WCAG translation files will look something like:

> :warning: **Note**: This is a rough estimation. The final result may differ, if other formats are more feasible.

`en/wcag/wcag20.json`:

```json
{
  "TITLE": "Web Content Accessibility Guidelines",
  "URLS": {
    "SPECIFICATION": "www.w3.org/TR/WCAG20/#",
    "UNDERSTANDING": "www.w3.org/TR/UNDERSTANDING-WCAG20/",
    "HOW_TO_MEET": "www.w3.org/WAI/WCAG20/quickref/#"
  },
  "PRINCIPLE": {
    "1": {
      "TITLE": "Perceivable",
      "DESCRIPTION": "Information and user interface components must be presentable to users in ways they can perceive."
    },
    "2": {}
  },
  "GUIDELINE": {
    "1.1": {
      "TITLE": "Text Alternatives",
      "DESCRIPTION": "Provide text alternatives for any non-text content so that it can be changed into other forms people need, such as large print, braille, speech, symbols or simpler language."
    },
    "1.2": {}
  },
  "SUCCESS_CRITERION": {
    "1.1.1": {
      "HTML_ID": "text-equiv",
      "TITLE": "Non-text Content",
      "DESCRIPTION": "All non-text content that is presented to the user has a text alternative that serves the equivalent purpose, except for the situations listed below.",
      "DETAILS": {
        "CONTROLS_INPUT": {
          "TITLE": "Controls, Input",
          "DESCRIPTION": "If non-text content is a control or accepts user input, then it has a name that describes its purpose. (Refer to Guideline 4.1 for additional requirements for controls and content that accepts user input.)"
        },
        "TIME_BASED_MEDIA": {}
      },
    },
    "1.2.1": {}
  }
}
```

When complete this translation file should contain every translateable key related to the WCAG Specification that is required for the WCAG-EM Report Tool.
