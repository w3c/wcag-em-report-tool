'use strict';

angular.module('wertDummy', ['wcagReporter'])
  .service('basicEvalOutput1', function (evalContextV1) {
    return {
      '@graph': [
        {
          '@context': evalContextV1,
          type: 'evaluation',
          id: '_:123',
          evaluationScope: {
            conformanceTarget: 'wcag20:level_aaa',
            additionalEvalRequirement: 'evalreqs',
            website: {
              id: '_:someSite',
              title: 'sitename',
              siteScope: 'sitescope'
            },
            accessibilitySupportBaseline: 'base'
          },
          auditResult: [
            {
              type: 'earl:assertion',
              testRequirement: 'wcag20:text-equiv-all',
              assertedBy: '_:evaluator',
              subject: '_:website',
              result: {
                outcome: 'earl:passed',
                description: 'I passed'
              },
              mode: 'manual',
              hasPart: [
                {
                  type: 'earl:assertion',
                  assertedBy: '_:evaluator',
                  subject: ['_:struct_0'],
                  result: {
                    outcome: 'earl:failed'
                  },
                  multiPage: false,
                  mode: 'manual',
                  testcase: 'wcag20:text-equiv-all'
                },
                {
                  type: 'earl:assertion',
                  assertedBy: '_:evaluator',
                  subject: ['_:rand_0'],
                  result: {
                    outcome: 'earl:failed'
                  },
                  multiPage: false,
                  mode: 'manual',
                  testcase: 'wcag20:text-equiv-all'
                }
              ]
            },
            {
              type: 'earl:assertion',
              testRequirement: 'wcag20:media-equiv-av-only-alt',
              assertedBy: '_:evaluator',
              subject: '_:website',
              result: {
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'manual',
              hasPart: []
            },
            {
              type: 'earl:assertion',
              testRequirement: 'wcag20:media-equiv-captions',
              assertedBy: '_:evaluator',
              subject: '_:website',
              result: {
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'manual',
              hasPart: []
            },
            {
              type: 'earl:assertion',
              testRequirement: 'wcag20:media-equiv-audio-desc',
              assertedBy: '_:evaluator',
              subject: '_:website',
              result: {
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'manual',
              hasPart: []
            },
            {
              type: 'earl:assertion',
              testRequirement: 'wcag20:content-structure-separation-programmatic',
              assertedBy: '_:evaluator',
              subject: '_:website',
              result: {
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'manual',
              hasPart: []
            },
            {
              type: 'earl:assertion',
              testRequirement: 'wcag20:content-structure-separation-sequence',
              assertedBy: '_:evaluator',
              subject: '_:website',
              result: {
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'manual',
              hasPart: []
            },
            {
              type: 'earl:assertion',
              testRequirement: 'wcag20:content-structure-separation-understanding',
              assertedBy: '_:evaluator',
              subject: '_:website',
              result: {
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'manual',
              hasPart: []
            },
            {
              type: 'earl:assertion',
              testRequirement: 'wcag20:visual-audio-contrast-without-color',
              assertedBy: '_:evaluator',
              subject: '_:website',
              result: {
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'manual',
              hasPart: []
            },
            {
              type: 'earl:assertion',
              testRequirement: 'wcag20:visual-audio-contrast-dis-audio',
              assertedBy: '_:evaluator',
              subject: '_:website',
              result: {
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'manual',
              hasPart: []
            },
            {
              type: 'earl:assertion',
              testRequirement: 'wcag20:keyboard-operation-keyboard-operable',
              assertedBy: '_:evaluator',
              subject: '_:website',
              result: {
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'manual',
              hasPart: []
            },
            {
              type: 'earl:assertion',
              testRequirement: 'wcag20:keyboard-operation-trapping',
              assertedBy: '_:evaluator',
              subject: '_:website',
              result: {
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'manual',
              hasPart: []
            },
            {
              type: 'earl:assertion',
              testRequirement: 'wcag20:time-limits-required-behaviors',
              assertedBy: '_:evaluator',
              subject: '_:website',
              result: {
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'manual',
              hasPart: []
            },
            {
              type: 'earl:assertion',
              testRequirement: 'wcag20:time-limits-pause',
              assertedBy: '_:evaluator',
              subject: '_:website',
              result: {
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'manual',
              hasPart: []
            },
            {
              type: 'earl:assertion',
              testRequirement: 'wcag20:seizure-does-not-violate',
              assertedBy: '_:evaluator',
              subject: '_:website',
              result: {
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'manual',
              hasPart: []
            },
            {
              type: 'earl:assertion',
              testRequirement: 'wcag20:navigation-mechanisms-skip',
              assertedBy: '_:evaluator',
              subject: '_:website',
              result: {
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'manual',
              hasPart: []
            },
            {
              type: 'earl:assertion',
              testRequirement: 'wcag20:navigation-mechanisms-title',
              assertedBy: '_:evaluator',
              subject: '_:website',
              result: {
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'manual',
              hasPart: []
            },
            {
              type: 'earl:assertion',
              testRequirement: 'wcag20:navigation-mechanisms-focus-order',
              assertedBy: '_:evaluator',
              subject: '_:website',
              result: {
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'manual',
              hasPart: []
            },
            {
              type: 'earl:assertion',
              testRequirement: 'wcag20:navigation-mechanisms-refs',
              assertedBy: '_:evaluator',
              subject: '_:website',
              result: {
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'manual',
              hasPart: []
            },
            {
              type: 'earl:assertion',
              testRequirement: 'wcag20:meaning-doc-lang-id',
              assertedBy: '_:evaluator',
              subject: '_:website',
              result: {
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'manual',
              hasPart: []
            },
            {
              type: 'earl:assertion',
              testRequirement: 'wcag20:consistent-behavior-receive-focus',
              assertedBy: '_:evaluator',
              subject: '_:website',
              result: {
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'manual',
              hasPart: []
            },
            {
              type: 'earl:assertion',
              testRequirement: 'wcag20:consistent-behavior-unpredictable-change',
              assertedBy: '_:evaluator',
              subject: '_:website',
              result: {
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'manual',
              hasPart: []
            },
            {
              type: 'earl:assertion',
              testRequirement: 'wcag20:minimize-error-identified',
              assertedBy: '_:evaluator',
              subject: '_:website',
              result: {
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'manual',
              hasPart: []
            },
            {
              type: 'earl:assertion',
              testRequirement: 'wcag20:minimize-error-cues',
              assertedBy: '_:evaluator',
              subject: '_:website',
              result: {
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'manual',
              hasPart: []
            },
            {
              type: 'earl:assertion',
              testRequirement: 'wcag20:ensure-compat-parses',
              assertedBy: '_:evaluator',
              subject: '_:website',
              result: {
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'manual',
              hasPart: []
            },
            {
              type: 'earl:assertion',
              testRequirement: 'wcag20:ensure-compat-rsv',
              assertedBy: '_:evaluator',
              subject: '_:website',
              result: {
                outcome: 'earl:untested',
                description: ''
              },
              mode: 'manual',
              hasPart: []
            }
          ],
          title: 'rep-title',
          commissioner: 'evalcomm',
          summary: 'summ',
          specifics: 'specs',
          creator: '_:niceGuy',
          structuredSample: {
            webpage: [
              {
                type: 'webpage',
                id: '_:struct_0',
                description: 'http://www.example.com',
                handle: 'page1',
                tested: false
              }
            ]
          },
          randomSample: {
            webpage: [
              {
                type: 'webpage',
                id: '_:rand_0',
                description: 'http://www.example.com/random',
                handle: 'random1',
                tested: false
              },
              {
                type: 'webpage',
                id: '_:rand_1',
                handle: 'random2',
                tested: false
              }
            ]
          },
          reliedUponTechnology: [
            {
              title: 'HTML5',
              id: 'http://www.w3.org/TR/html5/'
            },
            {
              title: 'CSS',
              id: 'http://www.w3.org/Style/CSS/specs/'
            }
          ],
          essentialFunctionality: 'ess-func',
          pageTypeVariety: 'vari-types',
          commonPages: [],
          otherRelevantPages: []
        },
        {
          '@context': {
            '@vocab': 'http://xmlns.com/foaf/spec/#',
            id: '@id',
            type: '@type'
          },
          id: '_:niceGuy',
          type: 'Person',
          name: 'terminator'
        }
      ]
    };
  });
