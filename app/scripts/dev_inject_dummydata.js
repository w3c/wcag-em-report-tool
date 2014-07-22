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
            'additionalEvalRequirement': 'Check if the site is cool too',
            'accessibilitySupportBaseline': 'My AS Baseline',
            'website': {
                'id': '_:website',
                'title': 'example.com website',
                'siteScope': 'All pages at http://example.com\nAll pages at https://my.example.com'
            }
        },
        'reliedUponTechnology': [{
            'title': 'html5',
            'specs': 'http://www.w3.org/TR/html5/'
        }, {
        	'title': 'PDF/a',
        	'specs': 'http://en.wikipedia.org/?title=PDF/A'
    	}],
        'commonPages': 'Page some stuff\npage another thing\netc.',
        'essentialFunctionality': 'Be fancy\nCombat the dark side',
        'pageTypeVariety': 'pdf\nodt\ndoc',
        'otherRelevantPages': 'How to BBQ\nThought for food\nPong for dummies',
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
        'creator' : 'MyName',
        'title'   : 'Dummy report on an example site',
        'date'    : '2014-01-01',
        'summary' : 'It\'s pretty good',
        'commissioner': 'The proud people at example.com',
        'specifics'   : 'We used W3C techniques',
        'auditResult': [{
            'type':                'assertion',
            'testRequirement': 'wcag20:text-equiv-all',
            'result': {
                'outcome':         'earl:fail',
                'description':     'You can solve this by...'
            },
            'subject':         '_:website',
            'assertedBy':      'http://nl.linkedin.com/in/wilcofiers/',
            'date':             '2014-01-01T19:20:30+01:00',
            'hasPart': [{
                'type':        'assertion',
                'testCase':    'Used technique F1',
                'subject':     ['_:rand_0', '_:struct_1'],
                'result': {
                    'outcome':     'earl:pass',
                    'description':  'You can solve this by...'
                },
                'assertedBy':  'http://nl.linkedin.com/in/wilcofiers/',
                'date':         '2014-01-01T19:20:30+01:00'
            }, {
                'type':            'assertion',
                'testCase':    'Used technique G1',
                'subject':     ['_:rand_1', '_:struct_0'],
                'result': {
                    'outcome':     'earl:fail'
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