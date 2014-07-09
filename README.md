WCAG-EM Report tool is a tool to help web accessibility evaluators to audit websites according to the W3C's WCAG Evaluation Methodology. This tool is developed as part of the WAI-ACT Project.

Important references:

- <http://www.w3.org/TR/WCAG20/>
- <http://www.w3.org/WAI/WCAG20/quickref/>
- <http://www.w3.org/TR/WCAG-EM/>

# Install

Before you can use the WCAG-EM report tool you'll need to install the following components: `NodeJS` (with NPM), `grunt-cli` (NPM module), and `Ruby`. If you have any of these already installed make sure they are updated.
Run:

    git clone git://github.com/w3c/wcag-em-report-tool.git
    gem install compass
    bower install

# Usage
You can launch a development version by running:

    grunt serve
    
To create a build in the /dist folder run:

    grunt build