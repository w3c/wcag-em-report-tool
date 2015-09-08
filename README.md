WCAG-EM Report tool is a tool to help web accessibility evaluators to audit websites according to the W3C's WCAG Evaluation Methodology. This tool is developed as part of the WAI-ACT Project.

Important references:

- <http://www.w3.org/TR/WCAG20/>
- <http://www.w3.org/WAI/WCAG20/quickref/>
- <http://www.w3.org/TR/WCAG-EM/>

The official released version of WeRT can be found at <http://www.w3.org/WAI/eval/report-tool/>. An example of the latest (unapproved by EO) version is available at <http://w3c.github.io/wcag-em-report-tool/dist/>.

See [Change log](changelog.md) for details about the latest version of WeRT.

# Install

Before you can use the WCAG-EM report tool you'll need to install the following components: `NodeJS` (with NPM), `grunt-cli` (NPM module), and `Ruby`. If you have any of these already installed make sure they are updated.
Run:

    git clone git://github.com/w3c/wcag-em-report-tool.git
    gem install compass
    npm install
    bower install

# Usage
You can launch a development version by running:

    grunt serve

To create a build in the /dist folder run:

    grunt build

# Data format

Data in the WCAG-EM Report Tool is saved and can again be loaded in a JSON
format. The data format is [JSON Linked Data](http://json-ld.org/), and
uses [EARL](http://www.w3.org/TR/EARL10-Schema/) to store the test results.

Custom fields are based on WCAG-EM and are documented in [dataformat.md].