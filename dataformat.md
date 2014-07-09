## Terms required from WCAG-EM namespace

- *evaluation*: Website accessibility audit
- *evaluationScope*: What the evaluation is about, as agreed between auditor and commissioner
- *website*: A collection of web pages that may it's self contain (sub)websites
- *websiteScope*: Property of Website. Rules to determine what pages are part of the website
- *accessibilitySupportBaseline*: Property of Website, see WCAG 2.0
- *conformanceTarget*: Which WCAG level is the evaluation targeted at
- *additionalEvalRequirement*: Other requirements of the evaluation
- *commissioner*: Person or organization who commissioned the audit
- *commonPages*, *essentialFunctionality*, *pageTypeVariety*, *otherRelevantPages*: as defined in WCAG-EM
- *webPage*: A web page as defined in WCAG, and a description of it's state
- *state*: Property of webPage, human readable description of the state
- *webPageSample*: List of webPage entities
- *structuredSample*: Subclass of webPageSample for structured web pages
- *randomSample*: Subclass of webPageSample for random web pages
- *specifics*: Contains miscellaneous details about the evaluation, as described in WCAG-EM Step 5.b
 
## Terms required from WCAG 2.0 Namespace

- *reliedUponTechnology*: Contains a dct:title and a pointer to it's specification
- *level_a*, *level_aa*, *level_aaa*, 
- *sc111*, *sc112*, ...


## Sample Report in JSON-LD
The following is a sample of what the data will 'more or less' look like when exported from the tool. The prefixes will be removed in favor of names defined in the @context.

    {
        "@context": {
            // Everything not prefixed is part of the WCAG-EM taxonomy: 
            "@vocab": "http://www.w3.org/TR/WCAG-EM/",
            "earl":   "http://www.w3.org/TR/EARL10-Schema/",
            "wcag":   "http://www.w3.org/TR/WCAG20/",
            "dct":    "http://purl.org/dc/terms/"
            /* ... */
        },
        /* "@type": evaluation ; Type is probably defined in @context */
        "evaluationScope": {
            "conformanceTarget":        "wcag:level_a",
            "commissioner":             "Plain text",
            "additionalEvalRequirement":"Plain text",
            "website": {
                "websiteScope":         "Plain text",
                "dct:title":            "Plain text"
            }
        },
        "earl:assertor": { /* As described in EARL */ }, /* One or more */
        "wcag:reliedUponTechnology": [{
            'dct:title':'html',
            'spec':''
        }/*, ...*/],
        "commonPages":              "Plain text",
        "essentialFunctionality":   "Plain text",
        "pageTypeVariety":          "Plain text",
        "otherRelevantPages":       "Plain text",
        "structuredSample": [{
            /*"@type": "webPage" ; preset by @context' */
            "uri":   "@uri",
            "state": "Plain text"
        }/*, ...*/],
        "randomSample": ["@webPage", "@webPage"/*, ...*/], // As structuredSample
        "dct:title":                "Plain text",
        /* When was the evaluation completed: */
        "dct:date":                 "Some date",
        "dct:abstract":             "Plain text", /* Evaluation summary */
        "Specifics":                "Plain text",
        /* All the EARL assertions go here */
        "@list": [{
            // Assertion of a success criterion: 
            /* @type: 'earl:assertion', */
            "earl:assertedBy":      "@auditor",
            "earl:subject":         "@website",
            "earl:testRequirement": "@wcag2Criterion",
            "earl:result":          "@earlResult",
            "earl:mode":            "@earlMode" /* Optional */
        }, {
            // Assertion of a individual results: 
            /* @type: 'earl:assertion', */
            "earl:assertedBy":      "@auditor",
            "earl:subject":         ["@pageID", "@pageID"/*, ...*/],
            "earl:testCase":        "Plain text",
            "earl:result":          "@earlResult",
            "earl:mode":            "@earlMode" /* Optional */
        }/*, ...*/]
        // Tool specific properties, not part of wcag-em taxonomy
        /* ... Possibly some other values as well such as which state the evaluator left off */
    }

