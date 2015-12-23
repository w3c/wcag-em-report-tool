# WCAG-EM Report Tool

This document describes the architecture and concepts behind 
the WCAG-EM Report Tool. The WCAG-EM Report Tool is based on 
the structure outlined by Yeoman Angular Generator 
(https://github.com/yeoman/generator-angular). Details about 
the structure of this project are also available here.

## Task Runner

Grunt is used as a task runner. To run the app from the app folder
use `grunt serve`. To build the app to the dist folder, run
`grunt build`.

To run the tests defined in the project, use the `grunt test` command.

## Directory structure

- `scripts/controllers/`: Connect the models to the views
- `scripts/directives/`: Angular directives for the app
- `scripts/filters/`: Filters used in the angular app
- `scripts/locale/`: Localization files build from the `locale` folder
- `scripts/models/`: Models for the data structure within the app
- `scripts/services/`: Services used within the controllers
- `views`: Contains the views / templates of the project
- `styles`: Styles in the form of SCSS

## Localization

There are currently two places from which the text of the app is
pulled. The localization for the UI is placed in directories under
`app/locale/xx/`. The texts used within WCAG are described in
`app/wcag2spec/wcag2-xx.json`.

More about translations, read [docs/translation.md]