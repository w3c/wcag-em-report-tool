# Translating the WCAG-EM Report Tool

The WCAG-EM Report Tool is set up with support for multiple languages in mind. By translating a number of files to your local language, a completely localized version of the WCAG-EM Report Tool can be created.

To do so, follow the these steps: (See below for details)

1. Install WCAG-EM Report Tool
2. Add a WCAG 2.0 translation file
3. Set up the new language
4. Translate the language files
5. Share your translation

''Important'': The WCAG-EM Report Tool currently focused on supporting ltr languages only. Support for rtl will be included in a later version.


## 1. Install WCAG-EM Report Tool
To install the report tool, follow the installation instructions for the WCAG-EM Report Tool.
https://github.com/w3c/wcag-em-report-tool#install


## 2. Add a WCAG 2.0 translation file
WCAG 2.0 has been translated into many different languages (http://www.w3.org/WAI/WCAG20/translations.html). The reporting tool uses a JSON format containing all the texts of WCAG principles, guidelines and criteria. This JSON document was generated using the Wcag2Json project. https://github.com/WilcoFiers/wcag2json/

The Wcag2Json project scrapes the HTML translations of WCAG and creates a JSON file for the Report Tool. These are available in different languages already. The Wcag2Json project has instructions explaining how to create JSON versions of other WCAG translations.

Once you have the wcag json file, copy it to `app/scripts/wcag2spec/` and give it a name of wcag2-xx.json (where xx is the language code of the language to include).


## 3. Set up the new language
To set up the new language, two things need to be done. Firstly, create a directory in app/locale/ and give it the name of the language code (example: app/locale/FR/). Then copy files from the JSON files from the another language directory (such as EN) into this new folder. These will be the bases of the translations.

Secondly, the WCAG-EM Report Tool must be informed that a new language should be included in the interface. Edit `app/scripts/app.language.js`. At line 4 of this file, an array is defined which hold the information about the supported languages. Add an object to this array with a `code` and `localName` property for the new language.

Example:

```javascript
	{
		code: 'fr',
		localName: 'Français'
	}
```

## 4. Translate the language files
The .json files in the locale/**/ directory can now be translated. For these files the text values should be translated to your local language. Take care to keep the <HTML> markup and the {{placeholders}} the same.  Errors occur if these are not changed.

To review the translations as you work, run `grunt serve` in your command prompt at the root of the project. Then go to http://localhost:9000 to see the tool.

When the translation is ready, the tool can be build as usual with the 
`grunt build` command. This builds the app in the dist directory.


## 5. Share your translation
Lastly after all your hard work. Take a break, and after that please share your work with the WCAG-EM Report Tool project. We would love to support more languages, and to do so we'll need the help of our users. If you are willing to contribute your work, and support us when updating the tool, we will support your language and so you will get all updates of the tool available in your local language.

Github's pull request feature is an amazing way to collaborate to open source projects such as the WCAG-EM Report Tool. So to contribute, your translation, the only thing you have to do is to publish your personal fork on Github and create a pull request. For more information on pull requests read: https://help.github.com/articles/using-pull-requests/

If you have any questions or problems creating a translation for the Report Tool, feel free to contact us or create an issue.