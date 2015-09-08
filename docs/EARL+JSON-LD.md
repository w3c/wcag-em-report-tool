# EARL + JSON-LD

The WCAG-EM Report Tool is an app created for accessibility auditors
to guide them in the process of auditing websites for accessibility
using the WCAG Evaluation Methodology. As any app should, the data
is stored in a common format that can be saved and loaded back
into the app.

At it's core, the WCAG-EM Report Tool uses the Evaluation And
Report Language (EARL), developed by the W3C. EARL is build on
top of the Resource Description Framework (RDF), which means it
can be expressed using different formats such as XML, Turtle and
JSON-LD. The WCAG-EM Report Tool requires significantly more
information than just the results of an evaluation. It has
data about the evaluation itself, such as the scope, sample, title,
summary, etc. The EARL results are part of an evaluation, and are
therefore embedded within the project.


## JSON Linked Data

Though RDF can be expressed in different formats, the WCAG-EM 
Report Tool can only load evaluation data expressed as JSON-LD.

Concepts of WCAG-EM are mapped to the steps in the WCAG-EM 
document. So, 'scope' is mapped to http://www.w3.org/TR/WCAG-EM/#step1

Details about the format can be found at:
https://github.com/w3c/wcag-em-report-tool/blob/master/dataformat.md
