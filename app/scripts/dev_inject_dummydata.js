'use strict';
angular.module('wcagReporter').run(function (
			wcagReporterExport, wcagReporterImport) {

	wcagReporterExport.setAutoSave({
		url: 'https://bo.accessibility.nl/report/api'
	});

	/*
		WARNING: Don't use this method, a correct method with
		type checking will be developed with a correct implemention
		of the Import function later in the project.
	 */
	var reportData = {
		'@id':   'https://bo.accessibility.nl/rapport/123456.json',
		evaluationScope: {
			conformanceTarget: 'wcag20:level_aa',
			additionalEvalRequirement: 'Be sure to check if the site is cool too',
			accessibilitySupportBaseline: 'my AS Baseline',
			website: {
				'@id': '_:website',
		    	name: 'W3C website',
		    	siteScope: 'All pages at http://w3.org\nAll pages at https://w3.org'
			},
		},

		reliedUponTechnology: [{
			'title': 'html5',
			'specs': 'http://www.w3.org/TR/html5/'
		}],
		commonPages: 'Page some stuff\npage another thing\netc.',
		essentialFunctionality: 'Be fancy\nCombat the dark side',
		pageTypeVariety: 'pdf\nodt\ndoc',
		otherRelevantPages: 'How to BBQ\nThought for food\nMonopoly for dummies',
		structuredSample: {
			pages: [{
				'@id': '_:struct_0',
				handle: 'Structure page 1',
				description: 'http://example.com/1 Click on "Home"'
			}, {
				'@id': '_:struct_1',
				handle: 'Structure page 2',
				description: 'http://example.com/2'
			}]
		},
		randomSample: {
			pages: [{
				'@id': '_:rand_0',
				handle: 'Random page 1',
				description: 'http://example.com/3 Click on "Home"'
			}, {
				'@id': '_:rand_1',
				handle: 'Random page 2',
				description: 'http://example.com/4'
			}]
		},

		creator     : 'Wilco',
		title       : 'My report on the W3C website',
		date        : '2014-01-01',
		commissioner: 'The World Wide Web Consortium (W3C) ',
		summary     : 'It\'s pretty good',
		specifics   : 'We used W3C techniques',

		successcriteria: [{
	        testRequirement: 'wcag20:text-equiv-all',
	        outcome:         'earl:failed',
	        subject:         '_:website',
	        assertedBy:      '_:auditor001',
	        date: '2014-01-01T19:20:30+01:00',
	        testcases: [{
	            testCase:        'Used technique F1',
	            description:     'You can solve this by...',
	            subject:         ['_:rand_0', '_:struct_1'],
	            outcome:         'earl:passed',
	            assertedBy:      '_:auditor001',
	        	date: '2014-01-01T19:20:30+01:00',
	        }, {
	        	testCase:        'Used technique G1',
	            subject:         ['_:rand_1', '_:struct_0'],
	            outcome:         'earl:failed',
	            assertedBy:      '_:auditor001',
	        	date: '2014-01-01T19:20:30+01:00',
	        }]
	    }]
	};

	wcagReporterImport._setData(reportData);

});