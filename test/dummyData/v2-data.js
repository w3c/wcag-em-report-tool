'use strict';

angular.module('wertDummy')
.service('basicEvalOutput2', function (evalContextV2) {
  return {
    '@graph': [
      {
        '@context': evalContextV2,
        'type': 'Evaluation', // Changed from 'evaluation'
        'id': '_:123',
        'lang': 'en',
        'title': 'rep-title',
        'summary': 'summ',
        'creator': '_:niceGuy',
        'date': '2008-12-11',
        'commissioner': 'evalcomm',
        'reliedUponTechnology': [
          {
            'type': 'Technology',
            'title': 'HTML5',
            'id': 'http://www.w3.org/TR/html5/'
          },
          {
            'type': 'Technology',
            'title': 'CSS',
            'id': 'http://www.w3.org/Style/CSS/specs/'
          }
        ],
        'evaluationScope': {
          'type': 'EvaluationScope',
          'conformanceTarget': 'wai:WCAG2AA-Conformance',
          'accessibilitySupportBaseline': 'base',
          'website': {
            'type': ['TestSubject', 'WebSite'],
            'id': '_:someSite',
            'siteName': 'sitename', // changed from 'title'
            'siteScope': 'sitescope'
          },
          'additionalEvalRequirement': 'evalreqs'
        },
        'commonPages': [],
        'essentialFunctionality': 'ess-func',
        'pageTypeVariety': 'vari-types',
        'otherRelevantPages': [],
        'structuredSample': {
          'type': 'Sample',
          'webpage': [
            {
              'type': ['TestSubject', 'WebPage'],
              'id': '_:struct_0',
              'description': 'http://www.example.com',
              'title': 'page1',
              'source': 'http://www.example.com', // new
              'tested': false
            }
          ]
        },
        'randomSample': {
          'type': 'Sample',
          'webpage': [
            {
              'type': ['TestSubject', 'WebPage'],
              'id': '_:rand_0',
              'description': 'http://www.example.com/random',
              'title': 'random1',
              'source': 'http://www.example.com/random', // new
              'tested': false
            }
          ]
        },
        'auditResult': [
          {
            'type': 'Assertion',
            'test': 'wcag20:text-equiv-all',
            'assertedBy': '_:evaluator',
            'subject': '_:website',
            'result': {
              'type' : 'TestResult',
              'outcome': 'earl:passed',
              'description': 'I passed'
            },
            'mode': 'earl:manual',
            'hasPart': []
          },
          {
            'type': 'Assertion',
            'test': 'wcag20:media-equiv-av-only-alt',
            'assertedBy': '_:evaluator',
            'subject': '_:website',
            'result': {
              'type' : 'TestResult',
              'outcome': 'earl:untested',
              'description': ''
            },
            'mode': 'earl:manual',
            'hasPart': []
          },
          {
            'type': 'Assertion',
            'test': 'wcag20:media-equiv-captions',
            'assertedBy': '_:evaluator',
            'subject': '_:website',
            'result': {
              'type' : 'TestResult',
              'outcome': 'earl:untested',
              'description': ''
            },
            'mode': 'earl:manual',
            'hasPart': []
          },
          {
            'type': 'Assertion',
            'test': 'wcag20:media-equiv-audio-desc',
            'assertedBy': '_:evaluator',
            'subject': '_:website',
            'result': {
              'type' : 'TestResult',
              'outcome': 'earl:untested',
              'description': ''
            },
            'mode': 'earl:manual',
            'hasPart': []
          },
          {
            'type': 'Assertion',
            'test': 'wcag20:content-structure-separation-programmatic',
            'assertedBy': '_:evaluator',
            'subject': '_:website',
            'result': {
              'type' : 'TestResult',
              'outcome': 'earl:untested',
              'description': ''
            },
            'mode': 'earl:manual',
            'hasPart': []
          },
          {
            'type': 'Assertion',
            'test': 'wcag20:content-structure-separation-sequence',
            'assertedBy': '_:evaluator',
            'subject': '_:website',
            'result': {
              'type' : 'TestResult',
              'outcome': 'earl:untested',
              'description': ''
            },
            'mode': 'earl:manual',
            'hasPart': []
          },
          {
            'type': 'Assertion',
            'test': 'wcag20:content-structure-separation-understanding',
            'assertedBy': '_:evaluator',
            'subject': '_:website',
            'result': {
              'type' : 'TestResult',
              'outcome': 'earl:untested',
              'description': ''
            },
            'mode': 'earl:manual',
            'hasPart': []
          },
          {
            'type': 'Assertion',
            'test': 'wcag20:visual-audio-contrast-without-color',
            'assertedBy': '_:evaluator',
            'subject': '_:website',
            'result': {
              'type' : 'TestResult',
              'outcome': 'earl:untested',
              'description': ''
            },
            'mode': 'earl:manual',
            'hasPart': []
          },
          {
            'type': 'Assertion',
            'test': 'wcag20:visual-audio-contrast-dis-audio',
            'assertedBy': '_:evaluator',
            'subject': '_:website',
            'result': {
              'type' : 'TestResult',
              'outcome': 'earl:untested',
              'description': ''
            },
            'mode': 'earl:manual',
            'hasPart': []
          },
          {
            'type': 'Assertion',
            'test': 'wcag20:keyboard-operation-keyboard-operable',
            'assertedBy': '_:evaluator',
            'subject': '_:website',
            'result': {
              'type' : 'TestResult',
              'outcome': 'earl:untested',
              'description': ''
            },
            'mode': 'earl:manual',
            'hasPart': []
          },
          {
            'type': 'Assertion',
            'test': 'wcag20:keyboard-operation-trapping',
            'assertedBy': '_:evaluator',
            'subject': '_:website',
            'result': {
              'type' : 'TestResult',
              'outcome': 'earl:untested',
              'description': ''
            },
            'mode': 'earl:manual',
            'hasPart': []
          },
          {
            'type': 'Assertion',
            'test': 'wcag20:time-limits-required-behaviors',
            'assertedBy': '_:evaluator',
            'subject': '_:website',
            'result': {
              'type' : 'TestResult',
              'outcome': 'earl:untested',
              'description': ''
            },
            'mode': 'earl:manual',
            'hasPart': []
          },
          {
            'type': 'Assertion',
            'test': 'wcag20:time-limits-pause',
            'assertedBy': '_:evaluator',
            'subject': '_:website',
            'result': {
              'type' : 'TestResult',
              'outcome': 'earl:untested',
              'description': ''
            },
            'mode': 'earl:manual',
            'hasPart': []
          },
          {
            'type': 'Assertion',
            'test': 'wcag20:seizure-does-not-violate',
            'assertedBy': '_:evaluator',
            'subject': '_:website',
            'result': {
              'type' : 'TestResult',
              'outcome': 'earl:untested',
              'description': ''
            },
            'mode': 'earl:manual',
            'hasPart': []
          },
          {
            'type': 'Assertion',
            'test': 'wcag20:navigation-mechanisms-skip',
            'assertedBy': '_:evaluator',
            'subject': '_:website',
            'result': {
              'type' : 'TestResult',
              'outcome': 'earl:untested',
              'description': ''
            },
            'mode': 'earl:manual',
            'hasPart': []
          },
          {
            'type': 'Assertion',
            'test': 'wcag20:navigation-mechanisms-title',
            'assertedBy': '_:evaluator',
            'subject': '_:website',
            'result': {
              'type' : 'TestResult',
              'outcome': 'earl:untested',
              'description': ''
            },
            'mode': 'earl:manual',
            'hasPart': []
          },
          {
            'type': 'Assertion',
            'test': 'wcag20:navigation-mechanisms-focus-order',
            'assertedBy': '_:evaluator',
            'subject': '_:website',
            'result': {
              'type' : 'TestResult',
              'outcome': 'earl:untested',
              'description': ''
            },
            'mode': 'earl:manual',
            'hasPart': []
          },
          {
            'type': 'Assertion',
            'test': 'wcag20:navigation-mechanisms-refs',
            'assertedBy': '_:evaluator',
            'subject': '_:website',
            'result': {
              'type' : 'TestResult',
              'outcome': 'earl:untested',
              'description': ''
            },
            'mode': 'earl:manual',
            'hasPart': []
          },
          {
            'type': 'Assertion',
            'test': 'wcag20:meaning-doc-lang-id',
            'assertedBy': '_:evaluator',
            'subject': '_:website',
            'result': {
              'type' : 'TestResult',
              'outcome': 'earl:untested',
              'description': ''
            },
            'mode': 'earl:manual',
            'hasPart': []
          },
          {
            'type': 'Assertion',
            'test': 'wcag20:consistent-behavior-receive-focus',
            'assertedBy': '_:evaluator',
            'subject': '_:website',
            'result': {
              'type' : 'TestResult',
              'outcome': 'earl:untested',
              'description': ''
            },
            'mode': 'earl:manual',
            'hasPart': []
          },
          {
            'type': 'Assertion',
            'test': 'wcag20:consistent-behavior-unpredictable-change',
            'assertedBy': '_:evaluator',
            'subject': '_:website',
            'result': {
              'type' : 'TestResult',
              'outcome': 'earl:untested',
              'description': ''
            },
            'mode': 'earl:manual',
            'hasPart': []
          },
          {
            'type': 'Assertion',
            'test': 'wcag20:minimize-error-identified',
            'assertedBy': '_:evaluator',
            'subject': '_:website',
            'result': {
              'type' : 'TestResult',
              'outcome': 'earl:untested',
              'description': ''
            },
            'mode': 'earl:manual',
            'hasPart': []
          },
          {
            'type': 'Assertion',
            'test': 'wcag20:minimize-error-cues',
            'assertedBy': '_:evaluator',
            'subject': '_:website',
            'result': {
              'type' : 'TestResult',
              'outcome': 'earl:untested',
              'description': ''
            },
            'mode': 'earl:manual',
            'hasPart': []
          },
          {
            'type': 'Assertion',
            'test': 'wcag20:ensure-compat-parses',
            'assertedBy': '_:evaluator',
            'subject': '_:website',
            'result': {
              'type' : 'TestResult',
              'outcome': 'earl:untested',
              'description': ''
            },
            'mode': 'earl:manual',
            'hasPart': []
          },
          {
            'type': 'Assertion',
            'test': 'wcag20:ensure-compat-rsv',
            'assertedBy': '_:evaluator',
            'subject': '_:website',
            'result': {
              'type' : 'TestResult',
              'outcome': 'earl:untested',
              'description': ''
            },
            'mode': 'earl:manual',
            'hasPart': []
          }
        ],
        'specifics': 'specs'
      },
      {
        '@context': {
          '@vocab': 'http://xmlns.com/foaf/spec/#',
          'id': '@id',
          'type': '@type'
        },
        'id': '_:niceGuy',
        'type': 'Person',
        'name': 'terminator'
      }
    ]
  }

});
