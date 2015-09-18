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

Currently, no test cases are defined for the project, so 
`grunt test` won't get you very far.

## Directory structure

- `scripts/controllers/`: Connect the models to the views
- `scripts/directives/`: Angular directives for the app
- `scripts/filters/`: Filters used in the angular app
- `scripts/locale/`: Localisation files build from the `locale` folder
- `scripts/models/`: Models for the data structure within the app
- `scripts/services/`: Services used within the controllers
- `views`: Contains the views / templates of the project
- `styles`: Styles in the form of SCSS

## Localisation

There are currently two files from which the text of the app is
pulled. For a translation of the app, these two files should be
updated. This is the `locales/en.json` file for all the text
specific to the app. The texts used within WCAG are described in
`app/scripts/models/wcag20specData.js`.

