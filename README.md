_Note: this tool is replaced by_ [WCAG-EM Report Tool, version 3.0.0](https://w3.org/WAI/eval/report-tool) (the code lives in the [wai-wcag-em-report-tool](https://github.com/w3c/wai-wcag-em-report-tool/) repository)

WCAG-EM Report tool is an assistant that takes the user
through the process of evaluating the accessibility of a
website, using the WCAG-EM Evaluation Methodology. The Report
Tool runs entirely on the client and so it can be used offline
and in any server configuration available to you.

The Report Tool does not save files to a server or in local
storage. Rather, load and save functions are available for
storing an evaluation to your local file system.

Important references:

- <http://www.w3.org/TR/WCAG20/>
- <http://www.w3.org/WAI/WCAG20/quickref/>
- <http://www.w3.org/TR/WCAG-EM/>

The official released version of the Report Tool can be found at <http://www.w3.org/WAI/eval/report-tool/>. An example of the latest (unapproved by EO) version is available at <http://w3c.github.io/wcag-em-report-tool/>.

See [Change log](changelog.md) for details about the latest version of the WCAG-EM Report Tool.


# Requirements

Before you can install the WCAG-EM Report Tool you will need
to install a few components:

- NodeJS https://nodejs.org/en/ (or [NodeJS with Node Version Manager installed](https://github.com/creationix/nvm))

  Minimum NodeJS version "lts/carbon" (Long term support)

- Ruby   https://www.ruby-lang.org/en/documentation/installation/

  Latest stable version


# Install

Install the _wcag em report tool_ by running:

```bash
# Choose a root folder to install this project then:

# 1
git clone https://github.com/w3c/wcag-em-report-tool.git

# 2
cd wcag-em-report-tool

# (Optional) if node installed with nvm
nvm install

# 3
npm install
```

This will fetch the project, install all node packages, bower components and compass. See `scripts: install` in `package.json` for detailed installation info.


# Usage
You can launch a development version by running:

    npm start

To create a build in the /dist folder run:

    npm run build

The build version can be hosted in on any server that available
on http(s). WCAG-EM Report Tool runs in your local browser, so it only loads static files from the server.


# Translations
The WCAG-EM Report Tool aims to be available for a wide audience.
Much effort has been put into making translations as easy as
possible. To learn about how to create your own translations
read the [translation documentation](docs/translation.md)


# Get Involved
Did you find a bug, or are you interested in working with us to
create new features for the Report Tool, then
[get involved with the project](docs/contribute.md)!

# Data Format
Data in the WCAG-EM Report Tool is saved and can again be loaded
in a JSON format. The data format is
[JSON Linked Data](http://json-ld.org/), and uses
[EARL](http://www.w3.org/TR/EARL10-Schema/) to store the test
results.

Custom fields are based on WCAG-EM and are documented in
[EARL+JSON-LD format definition](docs/EARL+JSON-LD.md).
