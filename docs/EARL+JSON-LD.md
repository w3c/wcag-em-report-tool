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



# Classes

Namcepaces:
- @vocab: (wcagem) 
- wcag2: 
- dct: 
- sch: schema.org
- earl: 

Classes:
- Evaluation
- EvaluationScope
- Sample
- WCAG:WebTechnology
- Schema:WebSite
- Schema:WebPage


## Evaluation

| Properties          | Type            | Description               |
|---------------------|-----------------|---------------------------|
| dct:title           | Text            |                           |
| dct:summary         | Text            |                           |
| dct:creator         | Text            |                           |
| dct:date            | ??              |                           |
| wcagem:commissioner | Text            |                           |
| wcag2:reliedupondef | Technology      |                           |
| wcagem:step1        | EvaluationScope | scope                     |
| wcagem:step2a       | Text            | commonPages               |
| wcagem:step2b       | Text            | essential functionality   |
| wcagem:step2c       | Text            | Variety of page types     |
| wcagem:step2e       | Text            | Other relevant pages      |
| wcagem:step3a       | Sample          | Structured sample pages   |
| wcagem:step3b       | Sample          | Ramdom sample pages       |
| wcagem:step4        | earl:Assertion  | Audit results             |
| wcagem:step5b       | Text            | Evaluation specifics      |


## EvaluationScope

| Properties          | Type        | Description                       |
|---------------------|-------------|-----------------------------------|
| wcagem:step1a       | Text        | Scope of the website              |
| wcagem:step1b       | URL         | conformance target                |
| wcagem:step1c       | Text        | Accessibility support baseline    |
| wcagem:step1d       | Text        | Additional evaluation requirement |
| ??:website          | sch:WebSite |                                   |


## Sample

| Properties          | Type        | Description                       |
|---------------------|-------------|-----------------------------------|
| webpage             | sch:WebPage |                                   |


## Technology

| Properties          | Type    | Description                       |
|---------------------|---------|-----------------------------------|
| dct:title           | Text    |                                   |
| @id                 | URL     |                                   |


## Schema:WebSite

A WebSite is a set of related web pages and other items typically served from a single web domain and accessible via URLs.


| Properties          | Type    | Description                       |
|---------------------|---------|-----------------------------------|
| siteScope           | Text    |                                   |
| sch:name            | Text    |                                   |


## Schema:WebPage

A web page. Every web page is implicitly assumed to be declared to be of type WebPage, so the various properties about that webpage, such as breadcrumb may be used. We recommend explicit declaration if these properties are specified, but if they are found outside of an itemscope, they will be assumed to be about the page.


| Properties          | Type    | Description                       |
|---------------------|---------|-----------------------------------|
| dct:title           | Text    |                                   |
| dct:description     | Text    |                                   |
| dct:source          | URL     |                                   |

