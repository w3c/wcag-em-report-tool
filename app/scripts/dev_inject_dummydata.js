'use strict';
angular.module('wcagReporter').run(function (
			wcagReporterExport, wcagReporterImport) {

	wcagReporterExport.setAutoSave({
		url: 'https://bo.accessibility.nl/report/api'
	});

	var context = {
        '@vocab': 'http://www.w3.org/TR/WCAG-EM/#',
        'wcag20': 'http://www.w3.org/TR/WCAG20/#',
        'earl': 'http://www.w3.org/ns/earl#',
        'dct': 'http://purl.org/dc/terms/',
        'conformanceTarget': {'id': 'step1b', 'type': 'id'},
        'evaluationScope':              {'id':   'step1'},
        'accessibilitySupportBaseline': {'id':   'step1c'},
        'additionalEvalRequirement':    {'id':   'step1d'},
        'siteScope':                    {'id':   'step1a'},
        'commonPages':                  {'id':   'step2a'},
        'essentialFunctionality':       {'id':   'step2b'},
        'pageTypeVariety':              {'id':   'step2c'},
        'otherRelevantPages':           {'id':   'step2e'},
        'structuredSample':             {'id':   'step3a'},
        'randomSample':                 {'id':   'step3b'},
        'specifics':                    {'id':   'step5b'},
        'auditResult':                  {'id':   'step4'},
        'outcome':                 {'type': 'id'},
        'subject':                 {'type': 'id'},
        'assertedBy':              {'type': 'id'},
        'testRequirement':         {'type': 'id'},
        'creator':                 {'type': 'id'},
        'handle':      null,
        'description': null,
        'currentStep': null,
        'id': '@id',
        'type': '@type',
        'title': 'dct:title',
        'specs': '@id',
        'reliedUponTechnology': 'wcag20:reliedupondef'
    };

	/*
		WARNING: Don't use this method, a correct method with
		type checking will be developed with a correct implemention
		of the Import function later in the project.
	 */
	var reportData =     [{
        '@context': context,
        'type': 'evaluation',
        'id':   'http://example.com/eval/123456.json',
        'currentStep': 'test',
        'evaluationScope': {
            'conformanceTarget': 'wcag20:level_aa',
            'additionalEvalRequirement': 'Provide repair suggestions for the identified errors',
            'accessibilitySupportBaseline': 'All content must be accessible using at least the following combinations of tools:\nWeb browser X versions a, b, and c with assistive technology M versions i, j, and k;\nWeb browser Y versions d, e, and f with assistive technology N versions p and q;\nWeb browser Z versions g and h with assistive Technology O versions r, s, t, and u.',
            'website': {
                'id': '_:website',
                'title': 'Public Website of Example Organization',
                'siteScope': 'All pages at http://example.org\nAll pages at https://shop.example.org'
            }
        },
        'reliedUponTechnology': [{
            'title': 'HTML5',
            'specs': 'http://www.w3.org/TR/html5/'
        }, {
        	'title': 'CSS3',
        	'specs': 'http://en.wikipedia.org/?title=PDF/A'
    	}],
        'commonPages': 'About Us (example.org/about)\nContact Us (example.org/contact)\nCopyright Notice (example.org/copyright)\nSitemap (example.org/sitemap)',
        'essentialFunctionality': 'Create account (registered users have customized content)\nLog-in and log-out\nSearch function (provided on each page)\nAll functions of the web shop (at shop.example.org)\nCredits calculator provided at example.org/calculator',
        'pageTypeVariety': 'Web pages under example.org/users/* have a separate design\nThere are electronic documents provided in PDF, DOC, and ODT formats\nThere is video content provided on some pages (eg example.org/speech)',
        'otherRelevantPages': 'Website Accessibility (example.org/accessibility)\nWebsite Help (example.org/help)\nWebsite Policy (example.org/policy)',
        'structuredSample': {
            'webpage': [{
                'type': 'webpage',
                'id': '_:struct_0',
                'handle': 'Homepage',
                'description': 'http://example.com/'
            }, {
                'type': 'webpage',
                'id': '_:struct_1',
                'handle': 'Sitemap',
                'description': 'http://example.com/sitemap'
            }, {
                'type': 'webpage',
                'id': '_:struct_2',
                'handle': 'Contact form',
                'description': 'http://example.com/contact'
            }, {
                'type': 'webpage',
                'id': '_:struct_3',
                'handle': 'map',
                'description': 'http://example.com/geo'
            }, {
                'type': 'webpage',
                'id': '_:struct_4',
                'handle': 'Video 1',
                'description': 'http://example.com/blog/2004/01/01'
            }, {
                'type': 'webpage',
                'id': '_:struct_5',
                'handle': 'Video 2',
                'description': 'http://example.com/media'
            }, {
                'type': 'webpage',
                'id': '_:struct_6',
                'handle': 'Structured page 7',
                'description': 'http://example.com/signup'
            }, {
                'type': 'webpage',
                'id': '_:struct_7',
                'handle': 'Structured page 8',
                'description': 'http://example.com/webshop'
            }, {
                'type': 'webpage',
                'id': '_:struct_8',
                'handle': 'Payment process 1',
                'description': 'http://example.com/payment/'
            }, {
                'type': 'webpage',
                'id': '_:struct_9',
                'handle': 'Payment process 2',
                'description': 'http://example.com/payment/ Click on "Buy products"'
            }, {
                'type': 'webpage',
                'id': '_:struct_10',
                'handle': 'Payment process 3',
                'description': 'http://example.com/payment/ Click on "Buy products", then fill in details and click "purchase"'
            }, {
                'type': 'webpage',
                'id': '_:struct_11',
                'handle': 'Homepage logged in',
                'description': 'http://example.com/ (after Login)'
            }, {
                'type': 'webpage',
                'id': '_:struct_12',
                'handle': 'Mobile version',
                'description': 'http://example.com/ Resize the screen to have a width of 800'
            }, {
                'type': 'webpage',
                'id': '_:struct_13',
                'handle': 'PDF download',
                'description': 'http://example.com/downloads/reports.pdf'
            }, {
                'type': 'webpage',
                'id': '_:struct_14',
                'handle': 'Accessibility statement',
                'description': 'http://example.com/accessibility'
            }, {
                'type': 'webpage',
                'id': '_:struct_15',
                'handle': 'Structured page 16',
                'description': 'http://example.com/social'
            }]
        },
        'randomSample': {
            'webpage': [{
                'type': 'webpage',
                'id': '_:rand_0',
                'handle': 'Random page 1',
                'description': 'http://example.com/random1'
            }, {
                'type': 'webpage',
                'id': '_:rand_1',
                'handle': 'Random page 2',
                'description': 'http://example.com/random8'
            }]
        },
        'creator' : 'Example Evaluator for Example Agency',
        'title'   : 'Website accessibility evaluation report for Example Organization',
        'date'    : '2014-01-01',
        'summary' : 'Overall the website shows good practice towards accessibility and WCAG 2.0 conformance. However, some issues were identified such as...',
        'commissioner': 'Example Organization',
        'specifics'   : 'Screenshots attached to show some of the web pages when they are magnified; Also some audio recordings have been made to highlight some of the issues when the web pages are read aloud.',
        'auditResult': [{
            'type':                'assertion',
            'testRequirement': 'wcag20:text-equiv-all',
            'result': {
                'outcome':         'earl:failed',
                'description':     'Images without text alternatives, for example the illustration on the sitemap'
            },
            'subject':         '_:website',
            'assertedBy':      'http://nl.linkedin.com/in/wilcofiers/',
            'date':             '2014-01-01T19:20:30+01:00',
            'hasPart': [{
                'type':        'assertion',
                //'testCase':    'Used technique F1',
                'subject':     ['_:struct_1'],
                'result': {
                    'outcome':     'earl:failed',
                    'description':  'Illustration does not have a text alternative'
                },
                'assertedBy':  'http://nl.linkedin.com/in/wilcofiers/',
                'date':         '2014-01-01T19:20:30+01:00'
            }, {
                'type':            'assertion',
                //'testCase':    'Used technique G1',
                'subject':     ['_:rand_1'],
                'result': {
                    'outcome':     'earl:failed'
                },
                'assertedBy':  'http://nl.linkedin.com/in/wilcofiers/',
                'date':         '2014-01-01T19:20:30+01:00'
            }]
        }]
    }, {
        '@context': {'@vocab': 'http://xmlns.com/foaf/spec/#'},
        'id': 'http://nl.linkedin.com/in/wilcofiers/',
        'type': 'Person',
        'firstName': 'Wilco',
        'lastName': 'Fiers'
    }];

	wcagReporterImport._setData(reportData[0]);

});
