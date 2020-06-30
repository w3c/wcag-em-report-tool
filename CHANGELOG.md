# Changelog WCAG-EM Report Tool
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Updates are described as "(Feature|Chore|Bug|Issue) : (Solution|Description|Reason)"


## [Unreleased - 3.0.0]
### Added
### Changed
- Project management: added Parcel bundler. Focus more on the project, rather than setup.
- JavaScript Library (to be chosen).

### Deprecated
### Fixed

### Removed
- AngularJS framework; This framework is too complex and all-inclusive for this type of projec  t. A new framework will be lighter and easier to grasp for starting developers so that it will be easier to be maintained. (Replaced with ...)
- Grunt Task manager has been removed. Grunt does a great job in giving full control in app development, but as a downside this needs configuration and user awereness of all the available tools to manage your app development. Newer tools do a lot of the work automagically and give developers the opportunity to start asap on the project at hand and focus on the assets required for the project rather than assets for setup. Grunt will most likely be replaced with Parcel, a bundler without loads of configuration.

### Security

## [2.0.0] - 2020/01/09
### Added
- Support for WCAG2.1
  - WCAG target selection in scope step.
  - WCAG target filter in audit step.
  - Compatibility upgrade for previous versions of WCAG.
- New import feature (initial); To give the possibility to load evaluations by others and automatic testing tools into your active evaluation. Imported evaluations need to match with active sample, WCAG criteria and have a result and author to be able to be imported in the active evaluation.
- New translation keys:
  - "AUDIT.FILTER_NEW_IN_WCAG21": "Added in WCAG 2.1",
  - "IMPORT.TITLE": "Import a WCAG EARL report",
  - "IMPORT.INTRO": "If you have used another application to generate a WCAG EARL-report that falls into the scope of this evaluation, you may be able to import these and add them to the evaluation audit result. The file itself should be: JSON-LD parseable, consist of objects in EARL format and evaluation tests should be related to WCAG.",
  - "IMPORT.LABEL_SELECT_FILE": "Select a JSON-LD file"
  - "NAV.MENU_IMPORT": "Import",
  - "SCOPE.LABEL_WCAG_VERSION": "WCAG Version"
  - "SCOPE.INFO_WCAG_VERSION": "Select the WCAG version to use. Version 2.1 (default) or 2.0"
  - "SCOPE.WCAG21": "WCAG 2.1"
  - "SCOPE.WCAG20": "WCAG 2.0"

### Changed
- WCAG spec json format was changed. Each criterion have an `alt_id` and `versions` key added.
- New WAI logo and new header and footer styles.
- The application now uses hashbang (#!) paths.

### Deprecated
- Adding a new translation for the tool in the current json format is deprecated. The new WCAG 2.1 format has added criteria and added keys in the json. Check the latest `[/app/wcag2spec/wcag2-en.json](/app/wcag2spec/wcag2-en.json)` to create an updated translation for this tool.

### Fixed
### Removed
### Security
- Updated nodeJS and bower dependencies.
- Updated to AngularJS 1.7.x

---

## [1.1.0] - 2015/12/30
### Added
- Support for multiple language
- Provide a set of unit tests

### Changed
- Update the data format
- Refactor the project for maintainability
- Improve project documentation

---

## [1.0.3] - 2015/06/15
### Fixed
- Resource menu wouldn't open properly

---

## [1.0.2] - 2015/04/03
### Added
- Changelog
- Repository to package.json

### Fixed
- Pages without handle and description are no longer shown outside step 3
- Creator data was sometimes duplicated
- Static meta data wasn't exported

---

## [1.0.1] - 2015/03/23
### Fixed
- Incorrect loading of single web technology
- Incorrect loading of page handles
