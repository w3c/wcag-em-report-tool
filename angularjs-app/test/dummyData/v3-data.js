'use strict';

angular
  .module('wertDummy')
  .service('basicEvalOutput3', function (
    evalContextV3
  ) {
    return {
      '@graph': [
        {
          '@context': evalContextV3,
          type: 'Evaluation',
          publisher: 'reporter:releases/tag/<%= pkg.version =%>',
          lang: 'en',
          evaluationScope: {
            type: 'EvaluationScope',
            conformanceTarget: 'wai:WCAG2AA-Conformance',
            additionalEvalRequirement: 'None',
            website: {
              type: [
                'TestSubject',
                'WebSite'
              ],
              id: '_:website',
              siteName: 'Website Name',
              siteScope: 'All pages on https://website-name.org'
            },
            accessibilitySupportBaseline: 'Browsers Latest version'
          },
          auditResult: [
            {
              type: 'Assertion',
              test: 'WCAG2:non-text-content',
              assertedBy: '_:evaluator',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:failed',
                description: 'Found 1 violation and 1 possible violation.',
                date: '2019-09-05 11:27:55 +0200'
              },
              mode: 'earl:manual',
              hasPart: [
                {
                  type: 'Assertion',
                  assertedBy: '_:evaluator',
                  subject: ['_:struct_0'],
                  result: {
                    type: 'TestResult',
                    outcome: 'earl:passed',
                    date: '2019-09-03 16:19:03 +0200',
                    description: 'No violations found'
                  },
                  multiPage: false,
                  mode: 'earl:manual',
                  testcase: 'WCAG2:non-text-content'
                },
                {
                  type: 'Assertion',
                  assertedBy: '_:evaluator',
                  subject: ['_:rand_0'],
                  result: {
                    type: 'TestResult',
                    outcome: 'earl:cantTell',
                    date: '2019-09-05 11:27:30 +0200',
                    description: 'Found possible applicable issue, but not sure...'
                  },
                  multiPage: false,
                  mode: 'earl:manual',
                  testcase: 'WCAG2:non-text-content'
                },
                {
                  type: 'Assertion',
                  assertedBy: '_:evaluator',
                  subject: ['_:struct_1'],
                  result: {
                    type: 'TestResult',
                    outcome: 'earl:failed',
                    date: '2019-09-05 11:26:46 +0200',
                    description: 'Found a violation ...'
                  },
                  multiPage: false,
                  mode: 'earl:manual',
                  testcase: 'WCAG2:non-text-content'
                },
                {
                  type: 'Assertion',
                  assertedBy: '_:evaluator',
                  subject: ['_:struct_2'],
                  result: {
                    type: 'TestResult',
                    outcome: 'earl:inapplicable',
                    date: '2019-09-05 11:27:00 +0200',
                    description: 'Nothing applicable'
                  },
                  multiPage: false,
                  mode: 'earl:manual',
                  testcase: 'WCAG2:non-text-content'
                }
              ]
            },
            {
              type: 'Assertion',
              test: 'WCAG2:audio-only-and-video-only-prerecorded',
              assertedBy: '_:evaluator',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:passed',
                description: '',
                date: '2019-09-05 11:28:03 +0200'
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:captions-prerecorded',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:audio-description-or-media-alternative-prerecorded',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:captions-live',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:audio-description-prerecorded',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:sign-language-prerecorded',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:extended-audio-description-prerecorded',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:media-alternative-prerecorded',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:audio-only-live',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:info-and-relationships',
              assertedBy: '_:evaluator',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:failed',
                description: '',
                date: '2019-09-05 11:28:13 +0200'
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:meaningful-sequence',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:sensory-characteristics',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:orientation',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:identify-input-purpose',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:identify-purpose',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:use-of-color',
              assertedBy: '_:evaluator',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:inapplicable',
                description: '',
                date: '2019-09-05 11:28:19 +0200'
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:audio-control',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:contrast-minimum',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:resize-text',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:images-of-text',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:contrast-enhanced',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:low-or-no-background-audio',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:visual-presentation',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:images-of-text-no-exception',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:reflow',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:non-text-contrast',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:text-spacing',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:content-on-hover-or-focus',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:keyboard',
              assertedBy: '_:evaluator',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:cantTell',
                description: '',
                date: '2019-09-05 11:28:26 +0200'
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:no-keyboard-trap',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:keyboard-no-exception',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:character-key-shortcuts',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:timing-adjustable',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:pause-stop-hide',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:no-timing',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:interruptions',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:re-authenticating',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:timeouts',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:three-flashes-or-below-threshold',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:three-flashes',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:animation-from-interactions',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:bypass-blocks',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:page-titled',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:focus-order',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:link-purpose-in-context',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:multiple-ways',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:headings-and-labels',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:focus-visible',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:location',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:link-purpose-link-only',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:section-headings',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:pointer-gestures',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:pointer-cancellation',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:label-in-name',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:motion-actuation',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:target-size',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:concurrent-input-mechanisms',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:language-of-page',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:language-of-parts',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:unusual-words',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:abbreviations',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:reading-level',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:pronunciation',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:on-focus',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:on-input',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:consistent-navigation',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:consistent-identification',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:change-on-request',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:error-identification',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:labels-or-instructions',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:error-suggestion',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:error-prevention-legal-financial-data',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:help',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:error-prevention-all',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:parsing',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:name-role-value',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            },
            {
              type: 'Assertion',
              test: 'WCAG2:status-messages',
              subject: '_:website',
              result: {
                type: 'TestResult',
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'earl:manual',
              hasPart: []
            }
          ],
          title: 'Report for Website Name',
          commissioner: 'External Commissioner',
          summary: 'There have been found some violations.',
          specifics: 'No evaluation specifics...',
          creator: '_:evaluator',
          structuredSample: {
            webpage: [
              {
                type: [
                  'TestSubject',
                  'WebPage'
                ],
                id: '_:struct_0',
                description: 'https://website-name.org',
                source: 'https://website-name.org',
                title: 'Homepage',
                tested: true
              },
              {
                type: [
                  'TestSubject',
                  'WebPage'
                ],
                id: '_:struct_1',
                description: 'https://website-name.org/contact-us/',
                source: 'https://website-name.org/contact-us/',
                title: 'Contact form',
                tested: false
              },
              {
                type: [
                  'TestSubject',
                  'WebPage'
                ],
                id: '_:struct_2',
                description: 'https://website-name.org/search/',
                source: 'https://website-name.org/search/',
                title: 'Search page',
                tested: false
              }
            ]
          },
          randomSample: {
            webpage: [
              {
                type: [
                  'TestSubject',
                  'WebPage'
                ],
                id: '_:rand_0',
                description: 'https://website-name.org/news/another-news-article/',
                source: 'https://website-name.org/news/another-news-article/',
                title: 'Random news page',
                tested: false
              },
              {
                type: [
                  'TestSubject',
                  'WebPage'
                ],
                id: '_:rand_1',
                description: 'https://website-name.org/search/?search=some-random-page',
                source: 'https://website-name.org/search/?search=some-random-page',
                title: 'Random search result page',
                tested: false
              }
            ]
          },
          reliedUponTechnology: [
            {
              title: 'HTML5',
              id: 'http://www.w3.org/TR/html5/',
              type: 'Technology'
            },
            {
              title: 'CSS',
              id: 'http://www.w3.org/Style/CSS/specs/',
              type: 'Technology'
            },
            {
              title: 'ECMAScript 5',
              id: 'http://www.ecma-international.org/publications/standards/Ecma-262.htm',
              type: 'Technology'
            },
            {
              title: 'SVG',
              id: 'http://www.w3.org/TR/SVG/',
              type: 'Technology'
            }
          ],
          essentialFunctionality: 'Find information',
          pageTypeVariety: 'Landing (Home)\nListview (e.g. news)\nDetailview (e.g. news about Website Name)\nContact form\nSearch page with pagination (page x ... y)'
        },
        {
          '@context': {
            '@vocab': 'http://xmlns.com/foaf/0.1/',
            id: '@id',
            type: '@type'
          },
          id: '_:evaluator',
          type: 'Person',
          name: 'External Evaluator'
        }
      ]
    };
  });
