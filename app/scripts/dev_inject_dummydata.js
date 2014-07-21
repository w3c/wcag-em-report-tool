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
        'id':   'https://bo.accessibility.nl/rapport/123456.json',
        'currentStep': 'test',
        'evaluationScope': {
            'conformanceTarget': 'wcag20:level_aa',
            'additionalEvalRequirement': 'Check if the site is cool too',
            'accessibilitySupportBaseline': 'My AS Baseline',
            'website': {
                'id': '_:website',
                'title': 'W3C website',
                'siteScope': 'All pages at http://w3.org\nAll pages at https://w3.org'
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
                'handle': 'Structure page 1',
                'description': 'http://www.w3.org/'
            }, {
                'type': 'webpage',
                'id': '_:struct_1',
                'handle': 'Structure page 2',
                'description': 'http://www.w3.org/WAI/users/Overview.html'
            }, {
                'type': 'webpage',
                'id': '_:struct_2',
                'handle': 'Structure page 3',
                'description': 'http://www.w3.org/community/'
            }, {
                'type': 'webpage',
                'id': '_:struct_3',
                'handle': 'Structure page 4',
                'description': 'http://www.w3.org/WAI/demos/bad/'
            }, {
                'type': 'webpage',
                'id': '_:struct_4',
                'handle': 'Structure page 5',
                'description': 'http://www.w3.org/community/svga11y/wiki/Main_Page'
            }, {
                'type': 'webpage',
                'id': '_:struct_5',
                'handle': 'Structure page 6',
                'description': 'http://www.w3.org/WAI/demos/bad/after/reports/template.html'
            }, {
                'type': 'webpage',
                'id': '_:struct_6',
                'handle': 'Structure page 7',
                'description': 'http://validator.w3.org'
            }, {
                'type': 'webpage',
                'id': '_:struct_7',
                'handle': 'Structure page 8',
                'description': 'http://w3.org/TR/WCAG-EM/'
            }, {
                'type': 'webpage',
                'id': '_:struct_8',
                'handle': 'Structure page 9',
                'description': 'http://www.w3.org/WAI/accessibility-support/#/log-in.html'
            }, {
                'type': 'webpage',
                'id': '_:struct_9',
                'handle': 'Structure page 10',
                'description': 'http://www.w3.org/standards/agents/'
            }, {
                'type': 'webpage',
                'id': '_:struct_10',
                'handle': 'Structure page 11',
                'description': 'http://www.w3.org/WAI/'
            }, {
                'type': 'webpage',
                'id': '_:struct_11',
                'handle': 'Structure page 12',
                'description': 'http://lists.w3.org/Archives/Public/public-svga11y/'
            }, {
                'type': 'webpage',
                'id': '_:struct_12',
                'handle': 'Structure page 13',
                'description': 'http://www.w3.org/WAI/WCAG20/quickref/'
            }, {
                'type': 'webpage',
                'id': '_:struct_13',
                'handle': 'Structure page 14',
                'description': 'http://www.w3.org/TR/WCAG20/'
            }, {
                'type': 'webpage',
                'id': '_:struct_14',
                'handle': 'Structure page 15',
                'description': 'https://validator-suite.w3.org'
            }, {
                'type': 'webpage',
                'id': '_:struct_15',
                'handle': 'Structure page 16',
                'description': 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/text-equiv-all.html'
            }]
        },
        'randomSample': {
            'webpage': [{
                'type': 'webpage',
                'id': '_:rand_0',
                'handle': 'Random page 1',
                'description': 'http://www.w3.org/standards/'
            }, {
                'type': 'webpage',
                'id': '_:rand_1',
                'handle': 'Random page 2',
                'description': 'http://www.w3.org/community/about/'
            }]
        },
        'creator' : 'http://nl.linkedin.com/in/wilcofiers/',
        'title'   : 'My report on the W3C website',
        'date'    : '2014-01-01',
        'summary' : 'It\'s pretty good',
        'commissioner': 'The World Wide Web Consortium (W3C) ',
        'specifics'   : 'We used W3C techniques',
        'auditResult': [{
            'type':                'assertion',
            'testRequirement': 'wcag20:text-equiv-all',
            'result': {
                'outcome':         'failed'
            },
            'subject':         '_:website',
            'assertedBy':      'http://nl.linkedin.com/in/wilcofiers/',
            'date':             '2014-01-01T19:20:30+01:00',
            'hasPart': [{
                'type':            'assertion',
                'testCase':    'Used technique F1',
                'subject':     ['_:rand_0', '_:struct_1'],
                'result': {
                    'outcome':     'passed',
                    'description':  'You can solve this by...'
                },
                'assertedBy':  'http://nl.linkedin.com/in/wilcofiers/',
                'date':         '2014-01-01T19:20:30+01:00'
            }, {
                'type':            'assertion',
                'testCase':    'Used technique G1',
                'subject':     ['_:rand_1', '_:struct_0'],
                'result': {
                    'outcome':     'failed'
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