## Terms required from WCAG-EM namespace

- *evaluation*: Website accessibility audit
- *evaluationScope*: What the evaluation is about, as agreed between auditor and commissioner
- *website*: A collection of web pages that may it's self contain (sub)websites
- *siteScope*: Property of Website. Rules to determine what pages are part of the website
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

- *reliedupondef*: Contains a dct:title and a pointer to it's specification
- *level_a*, *level_aa*, *level_aaa* (Note: There is no actual URI for levels, these three are proxies)
- *text-equiv-all*, ...


## Sample Report in JSON-LD

    [{
        "@context": {
            "@vocab": "http://www.w3.org/TR/WCAG-EM/#",
            "wcag20": "http://www.w3.org/TR/WCAG20/#",
            "earl": "http://www.w3.org/ns/earl#",
            "dct": "http://purl.org/dc/terms/",
            "conformanceTarget": {
                "@id": "step1b",
                "@type": "@id"
            },
            "evaluationScope":              {"@id":   "step1"},
            "accessibilitySupportBaseline": {"@id":   "step1c"},
            "additionalEvalRequirement":    {"@id":   "step1d"},
            "siteScope":                    {"@id":   "step1a"},
            "commonPages":                  {"@id":   "step2a"},
            "essentialFunctionality":       {"@id":   "step2b"},
            "pageTypeVariety":              {"@id":   "step2c"},
            "otherRelevantPages":           {"@id":   "step2e"},
            "structuredSample":             {"@id":   "step3a"},
            "randomSample":                 {"@id":   "step3b"},
            "specifics":                    {"@id":   "step5b"},
            "auditResult":                  {"@id":   "step4"},
            "earl:outcome":                 {"@type": "@id"},
            "earl:subject":                 {"@type": "@id"},
            "earl:assertedBy":              {"@type": "@id"},
            "earl:outcome":                 {"@type": "@id"},
            "earl:testRequirement":         {"@type": "@id"},
            "dct:creator":                  {"@type": "@id"},
            "handle":      null,
            "description": null,
            "currentStep": null
        },
        "@type": "evaluation",
        "@id":   "https://bo.accessibility.nl/rapport/123456.json",
        "currentStep": "test",
        "evaluationScope": {
            "conformanceTarget": "wcag20:level_aa",
            "additionalEvalRequirement": "Check if the site is cool too",
            "accessibilitySupportBaseline": "My AS Baseline",
            "website": {
                "@id": "_:website",
                "dct:title": "W3C website",
                "siteScope": "All pages at http://w3.org\nAll pages at https://w3.org"
            }
        },
        "wcag20:reliedupondef": [{
            "dct:title": "html5",
            "@id": "http://www.w3.org/TR/html5/"
        }],
        "commonPages": "Page some stuff\npage another thing\netc.",
        "essentialFunctionality": "Be fancy\nCombat the dark side",
        "pageTypeVariety": "pdf\nodt\ndoc",
        "otherRelevantPages": "How to BBQ\nThought for food\nPong for dummies",
        "structuredSample": {
            "webpage": [{
                "@type": "webpage",
                "@id": "_:struct_0",
                "handle": "Structure page 1",
                "description": "http://example.com/1 Click on \"Home\""
            }, {
                "@type": "webpage",
                "@id": "_:struct_1",
                "handle": "Structure page 2",
                "description": "http://example.com/2"
            }]
        },
        "randomSample": {
            "webpage": [{
                "@type": "webpage",
                "@id": "_:rand_0",
                "handle": "Random page 1",
                "description": "http://example.com/3 Click on \"Home\""
            }, {
                "@type": "webpage",
                "@id": "_:rand_1",
                "handle": "Random page 2",
                "description": "http://example.com/4"
            }]
        },
        "dct:creator" : "http://nl.linkedin.com/in/wilcofiers/",
        "dct:title"   : "My report on the W3C website",
        "dct:date"    : "2014-01-01",
        "dct:summary" : "It\"s pretty good",
        "commissioner": "The World Wide Web Consortium (W3C) ",
        "specifics"   : "We used W3C techniques",
        "auditResult": [{
            "@type":                "earl:assertion",
            "earl:testRequirement": "wcag20:text-equiv-all",
            "earl:result": {
                "earl:outcome":         "earl:failed"
            },
            "earl:subject":         "_:website",
            "earl:assertedBy":      "http://nl.linkedin.com/in/wilcofiers/",
            "dct:date":             "2014-01-01T19:20:30+01:00",
            "dct:hasPart": [{
                "@type":            "earl:assertion",
                "earl:testCase":    "Used technique F1",
                "earl:subject":     ["_:rand_0", "_:struct_1"],
                "earl:result": {
                    "earl:outcome":     "earl:passed",
                    "dct:description":  "You can solve this by..."
                },
                "earl:assertedBy":  "http://nl.linkedin.com/in/wilcofiers/",
                "dct:date":         "2014-01-01T19:20:30+01:00"
            }, {
                "@type":            "earl:assertion",
                "earl:testCase":    "Used technique G1",
                "earl:subject":     ["_:rand_1", "_:struct_0"],
                "earl:result": {
                    "earl:outcome":     "earl:failed"
                },
                "earl:assertedBy":  "_:auditor001",
                "dct:date":         "2014-01-01T19:20:30+01:00"
            }]
        }]
    }, {
        "@context": {"@vocab": "http://xmlns.com/foaf/spec/#"},
        "@id": "http://nl.linkedin.com/in/wilcofiers/",
        "@type": "Person",
        "firstName": "Wilco",
        "lastName": "Fiers"
    }]