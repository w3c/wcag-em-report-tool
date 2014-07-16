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
        '@context': {
            '@vocab': 'http://www.w3.org/TR/WCAG-EM/#',
            'wcag20': 'http://www.w3.org/TR/WCAG20/#',
            'earl': 'http://www.w3.org/ns/earl#',
            'dct': 'http://purl.org/dc/terms/'
        },
        '@id':   'https://bo.accessibility.nl/rapport/123456.json',
        '@type': 'evaluation',
        evaluationScope: {
            conformanceTarget: 'wcag20:level_aa',
            additionalEvalRequirement: 'Check if the site is cool too',
            accessibilitySupportBaseline: 'My AS Baseline',
            website: {
                '@id': '_:website',
                'dct:title': 'W3C website',
                siteScope: 'All pages at http://w3.org\nAll pages at https://w3.org'
            },
        },
        wcag20:reliedupondef: [{
            'dct:title': 'html5',
            '@id': 'http://www.w3.org/TR/html5/'
        }],
        commonPages: 'Page some stuff\npage another thing\netc.',
        essentialFunctionality: 'Be fancy\nCombat the dark side',
        pageTypeVariety: 'pdf\nodt\ndoc',
        otherRelevantPages: 'How to BBQ\nThought for food\nPong for dummies',
        structuredSample: {
            pages: [{
                '@type': 'webpage',
                '@id': '_:struct_0',
                handle: 'Structure page 1',
                description: 'http://example.com/1 Click on "Home"'
            }, {
                '@type': 'webpage',
                '@id': '_:struct_1',
                handle: 'Structure page 2',
                description: 'http://example.com/2'
            }]
        },
        randomSample: {
            pages: [{
                '@type': 'webpage',
                '@id': '_:rand_0',
                handle: 'Random page 1',
                description: 'http://example.com/3 Click on "Home"'
            }, {
                '@type': 'webpage',
                '@id': '_:rand_1',
                handle: 'Random page 2',
                description: 'http://example.com/4'
            }]
        },
        'dct:creator' : 'Wilco',
        'dct:title'   : 'My report on the W3C website',
        'dct:date'    : '2014-01-01',
        'dct:summary' : 'It\'s pretty good',
        commissioner  : 'The World Wide Web Consortium (W3C) ',
        specifics     : 'We used W3C techniques',
        successcriteria: [{
            '@type':                'earl:assertion',
            'earl:testRequirement': 'wcag20:text-equiv-all',
            'earl:result': {
                'earl:outcome':         'earl:failed',
            },
            'earl:subject':         '_:website',
            'earl:assertedBy':      '_:auditor001',
            'dct:date':             '2014-01-01T19:20:30+01:00',
            testcases: [{
                '@type':            'earl:assertion',
                'earl:testCase':    'Used technique F1',
                'earl:subject':     ['_:rand_0', '_:struct_1'],
                'earl:result': {
                    'earl:outcome':     'earl:passed',
                    'dct:description':  'You can solve this by...',
                },
                'earl:assertedBy':  '_:auditor001',
                'dct:date':         '2014-01-01T19:20:30+01:00',
            }, {
                '@type':            'earl:assertion',
                'earl:testCase':    'Used technique G1',
                'earl:subject':     ['_:rand_1', '_:struct_0'],
                'earl:result': {
                    'earl:outcome':     'earl:failed',
                },
                'earl:assertedBy':  '_:auditor001',
                'dct:date':         '2014-01-01T19:20:30+01:00',
            }]
        }]
    };