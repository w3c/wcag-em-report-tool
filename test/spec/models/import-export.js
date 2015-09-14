'use strict';

describe('Model: import & export', function () {

    // load the service's module
    beforeEach(module('wcagReporter'));

    // instantiate service
    var wcagImport;
    var evalModel;

    beforeEach(inject(function (wcagReporterImport, _evalModel_) {
        wcagImport = wcagReporterImport;
        evalModel = _evalModel_;
    }));

    it('should exist', function () {
        expect(typeof wcagImport).toBe('object');
    });

    it('has import methods', function () {
        expect(typeof wcagImport.fromJson).toBe('function');
        expect(typeof wcagImport.getFromUrl).toBe('function');
        expect(typeof wcagImport.fromObject).toBe('function');
    });

    it ('imports json-ld objects', function () {
        wcagImport.fromObject(dummyData);
        console.log(dummyData);
    });
    

    var dummyData = {
      "@graph": [
        {
          "@context": {
            "@vocab": "http://www.w3.org/TR/WCAG-EM/#",
            "wcag20": "http://www.w3.org/TR/WCAG20/#",
            "earl": "http://www.w3.org/ns/earl#",
            "dct": "http://purl.org/dc/terms/",
            "reporter": "https://github.com/w3c/wcag-em-report-tool/blob/master/dataformat.md#",
            "conformanceTarget": {
              "id": "step1b",
              "type": "id"
            },
            "evaluationScope": {
              "id": "step1"
            },
            "accessibilitySupportBaseline": {
              "id": "step1c"
            },
            "additionalEvalRequirement": {
              "id": "step1d"
            },
            "siteScope": {
              "id": "step1a"
            },
            "commonPages": {
              "id": "step2a"
            },
            "essentialFunctionality": {
              "id": "step2b"
            },
            "pageTypeVariety": {
              "id": "step2c"
            },
            "otherRelevantPages": {
              "id": "step2e"
            },
            "structuredSample": {
              "id": "step3a"
            },
            "randomSample": {
              "id": "step3b"
            },
            "specifics": {
              "id": "step5b"
            },
            "auditResult": {
              "id": "step4"
            },
            "outcome": {
              "type": "id"
            },
            "subject": {
              "type": "id"
            },
            "assertedBy": {
              "type": "id"
            },
            "testRequirement": {
              "type": "id"
            },
            "creator": {
              "type": "id"
            },
            "handle": "reporter:handle",
            "description": "reporter:description",
            "tested": "reporter:tested",
            "id": "@id",
            "type": "@type",
            "title": "dct:title",
            "hasPart": "dct:hasPart",
            "specs": "@id",
            "reliedUponTechnology": "wcag20:reliedupondef"
          },
          "type": "evaluation",
          "evaluationScope": {
            "conformanceTarget": "wcag20:level_aa",
            "additionalEvalRequirement": "ADDITIONAL",
            "website": {
              "id": "_:website",
              "title": "SITENAME",
              "siteScope": "SITESCOPE"
            },
            "accessibilitySupportBaseline": "BASELINE"
          },
          "auditResult": [
            {
              "type": "earl:assertion",
              "testRequirement": "wcag20:text-equiv-all",
              "assertedBy": "_:evaluator",
              "subject": "_:website",
              "result": {
                "outcome": "earl:passed",
                "description": "PASS1"
              },
              "mode": "manual",
              "hasPart": [
                {
                  "type": "earl:assertion",
                  "assertedBy": "_:evaluator",
                  "subject": [
                    "_:rand_0"
                  ],
                  "result": {
                    "outcome": "earl:passed",
                    "description": "PASS2"
                  },
                  "multiPage": false,
                  "mode": "manual",
                  "testcase": "wcag20:text-equiv-all"
                }
              ]
            },
            {
              "type": "earl:assertion",
              "testRequirement": "wcag20:media-equiv-av-only-alt",
              "assertedBy": "_:evaluator",
              "subject": "_:website",
              "result": {
                "outcome": "earl:failed",
                "description": "FAIL1"
              },
              "mode": "manual",
              "hasPart": [
                {
                  "type": "earl:assertion",
                  "assertedBy": "_:evaluator",
                  "subject": [
                    "_:struct_1"
                  ],
                  "result": {
                    "outcome": "earl:failed",
                    "description": "FAIL2"
                  },
                  "multiPage": false,
                  "mode": "manual",
                  "testcase": "wcag20:media-equiv-av-only-alt"
                }
              ]
            },
            {
              "type": "earl:assertion",
              "testRequirement": "wcag20:media-equiv-captions",
              "assertedBy": "_:evaluator",
              "subject": "_:website",
              "result": {
                "outcome": "earl:inapplicable",
                "description": "INAPPLICABLE1"
              },
              "mode": "manual",
              "hasPart": [
                {
                  "type": "earl:assertion",
                  "assertedBy": "_:evaluator",
                  "subject": [
                    "_:struct_0"
                  ],
                  "result": {
                    "description": "INAPPLICABLE2",
                    "outcome": "earl:inapplicable"
                  },
                  "multiPage": false,
                  "mode": "manual",
                  "testcase": "wcag20:media-equiv-captions"
                }
              ]
            },
            {
              "type": "earl:assertion",
              "testRequirement": "wcag20:media-equiv-audio-desc",
              "assertedBy": "_:evaluator",
              "subject": "_:website",
              "result": {
                "outcome": "earl:untested",
                "description": ""
              },
              "mode": "manual",
              "hasPart": []
            },
            {
              "type": "earl:assertion",
              "testRequirement": "wcag20:media-equiv-real-time-captions",
              "assertedBy": "_:evaluator",
              "subject": "_:website",
              "result": {
                "outcome": "earl:untested",
                "description": ""
              },
              "mode": "manual",
              "hasPart": []
            },
            {
              "type": "earl:assertion",
              "testRequirement": "wcag20:media-equiv-audio-desc-only",
              "assertedBy": "_:evaluator",
              "subject": "_:website",
              "result": {
                "outcome": "earl:untested",
                "description": ""
              },
              "mode": "manual",
              "hasPart": []
            },
            {
              "type": "earl:assertion",
              "testRequirement": "wcag20:content-structure-separation-programmatic",
              "assertedBy": "_:evaluator",
              "subject": "_:website",
              "result": {
                "outcome": "earl:untested",
                "description": ""
              },
              "mode": "manual",
              "hasPart": []
            },
            {
              "type": "earl:assertion",
              "testRequirement": "wcag20:content-structure-separation-sequence",
              "assertedBy": "_:evaluator",
              "subject": "_:website",
              "result": {
                "outcome": "earl:untested",
                "description": ""
              },
              "mode": "manual",
              "hasPart": []
            },
            {
              "type": "earl:assertion",
              "testRequirement": "wcag20:content-structure-separation-understanding",
              "assertedBy": "_:evaluator",
              "subject": "_:website",
              "result": {
                "outcome": "earl:untested",
                "description": ""
              },
              "mode": "manual",
              "hasPart": []
            },
            {
              "type": "earl:assertion",
              "testRequirement": "wcag20:visual-audio-contrast-without-color",
              "assertedBy": "_:evaluator",
              "subject": "_:website",
              "result": {
                "outcome": "earl:untested",
                "description": ""
              },
              "mode": "manual",
              "hasPart": []
            },
            {
              "type": "earl:assertion",
              "testRequirement": "wcag20:visual-audio-contrast-dis-audio",
              "assertedBy": "_:evaluator",
              "subject": "_:website",
              "result": {
                "outcome": "earl:untested",
                "description": ""
              },
              "mode": "manual",
              "hasPart": []
            },
            {
              "type": "earl:assertion",
              "testRequirement": "wcag20:visual-audio-contrast-contrast",
              "assertedBy": "_:evaluator",
              "subject": "_:website",
              "result": {
                "outcome": "earl:untested",
                "description": ""
              },
              "mode": "manual",
              "hasPart": []
            },
            {
              "type": "earl:assertion",
              "testRequirement": "wcag20:visual-audio-contrast-scale",
              "assertedBy": "_:evaluator",
              "subject": "_:website",
              "result": {
                "outcome": "earl:untested",
                "description": ""
              },
              "mode": "manual",
              "hasPart": []
            },
            {
              "type": "earl:assertion",
              "testRequirement": "wcag20:visual-audio-contrast-text-presentation",
              "assertedBy": "_:evaluator",
              "subject": "_:website",
              "result": {
                "outcome": "earl:untested",
                "description": ""
              },
              "mode": "manual",
              "hasPart": []
            },
            {
              "type": "earl:assertion",
              "testRequirement": "wcag20:keyboard-operation-keyboard-operable",
              "assertedBy": "_:evaluator",
              "subject": "_:website",
              "result": {
                "outcome": "earl:untested",
                "description": ""
              },
              "mode": "manual",
              "hasPart": []
            },
            {
              "type": "earl:assertion",
              "testRequirement": "wcag20:keyboard-operation-trapping",
              "assertedBy": "_:evaluator",
              "subject": "_:website",
              "result": {
                "outcome": "earl:untested",
                "description": ""
              },
              "mode": "manual",
              "hasPart": []
            },
            {
              "type": "earl:assertion",
              "testRequirement": "wcag20:time-limits-required-behaviors",
              "assertedBy": "_:evaluator",
              "subject": "_:website",
              "result": {
                "outcome": "earl:untested",
                "description": ""
              },
              "mode": "manual",
              "hasPart": []
            },
            {
              "type": "earl:assertion",
              "testRequirement": "wcag20:time-limits-pause",
              "assertedBy": "_:evaluator",
              "subject": "_:website",
              "result": {
                "outcome": "earl:untested",
                "description": ""
              },
              "mode": "manual",
              "hasPart": []
            },
            {
              "type": "earl:assertion",
              "testRequirement": "wcag20:seizure-does-not-violate",
              "assertedBy": "_:evaluator",
              "subject": "_:website",
              "result": {
                "outcome": "earl:untested",
                "description": ""
              },
              "mode": "manual",
              "hasPart": []
            },
            {
              "type": "earl:assertion",
              "testRequirement": "wcag20:navigation-mechanisms-skip",
              "assertedBy": "_:evaluator",
              "subject": "_:website",
              "result": {
                "outcome": "earl:untested",
                "description": ""
              },
              "mode": "manual",
              "hasPart": []
            },
            {
              "type": "earl:assertion",
              "testRequirement": "wcag20:navigation-mechanisms-title",
              "assertedBy": "_:evaluator",
              "subject": "_:website",
              "result": {
                "outcome": "earl:untested",
                "description": ""
              },
              "mode": "manual",
              "hasPart": []
            },
            {
              "type": "earl:assertion",
              "testRequirement": "wcag20:navigation-mechanisms-focus-order",
              "assertedBy": "_:evaluator",
              "subject": "_:website",
              "result": {
                "outcome": "earl:untested",
                "description": ""
              },
              "mode": "manual",
              "hasPart": []
            },
            {
              "type": "earl:assertion",
              "testRequirement": "wcag20:navigation-mechanisms-refs",
              "assertedBy": "_:evaluator",
              "subject": "_:website",
              "result": {
                "outcome": "earl:untested",
                "description": ""
              },
              "mode": "manual",
              "hasPart": []
            },
            {
              "type": "earl:assertion",
              "testRequirement": "wcag20:navigation-mechanisms-mult-loc",
              "assertedBy": "_:evaluator",
              "subject": "_:website",
              "result": {
                "outcome": "earl:untested",
                "description": ""
              },
              "mode": "manual",
              "hasPart": []
            },
            {
              "type": "earl:assertion",
              "testRequirement": "wcag20:navigation-mechanisms-descriptive",
              "assertedBy": "_:evaluator",
              "subject": "_:website",
              "result": {
                "outcome": "earl:untested",
                "description": ""
              },
              "mode": "manual",
              "hasPart": []
            },
            {
              "type": "earl:assertion",
              "testRequirement": "wcag20:navigation-mechanisms-focus-visible",
              "assertedBy": "_:evaluator",
              "subject": "_:website",
              "result": {
                "outcome": "earl:untested",
                "description": ""
              },
              "mode": "manual",
              "hasPart": []
            },
            {
              "type": "earl:assertion",
              "testRequirement": "wcag20:meaning-doc-lang-id",
              "assertedBy": "_:evaluator",
              "subject": "_:website",
              "result": {
                "outcome": "earl:untested",
                "description": ""
              },
              "mode": "manual",
              "hasPart": []
            },
            {
              "type": "earl:assertion",
              "testRequirement": "wcag20:meaning-other-lang-id",
              "assertedBy": "_:evaluator",
              "subject": "_:website",
              "result": {
                "outcome": "earl:untested",
                "description": ""
              },
              "mode": "manual",
              "hasPart": []
            },
            {
              "type": "earl:assertion",
              "testRequirement": "wcag20:consistent-behavior-receive-focus",
              "assertedBy": "_:evaluator",
              "subject": "_:website",
              "result": {
                "outcome": "earl:untested",
                "description": ""
              },
              "mode": "manual",
              "hasPart": []
            },
            {
              "type": "earl:assertion",
              "testRequirement": "wcag20:consistent-behavior-unpredictable-change",
              "assertedBy": "_:evaluator",
              "subject": "_:website",
              "result": {
                "outcome": "earl:untested",
                "description": ""
              },
              "mode": "manual",
              "hasPart": []
            },
            {
              "type": "earl:assertion",
              "testRequirement": "wcag20:consistent-behavior-consistent-locations",
              "assertedBy": "_:evaluator",
              "subject": "_:website",
              "result": {
                "outcome": "earl:untested",
                "description": ""
              },
              "mode": "manual",
              "hasPart": []
            },
            {
              "type": "earl:assertion",
              "testRequirement": "wcag20:consistent-behavior-consistent-functionality",
              "assertedBy": "_:evaluator",
              "subject": "_:website",
              "result": {
                "outcome": "earl:untested",
                "description": ""
              },
              "mode": "manual",
              "hasPart": []
            },
            {
              "type": "earl:assertion",
              "testRequirement": "wcag20:minimize-error-identified",
              "assertedBy": "_:evaluator",
              "subject": "_:website",
              "result": {
                "outcome": "earl:untested",
                "description": ""
              },
              "mode": "manual",
              "hasPart": []
            },
            {
              "type": "earl:assertion",
              "testRequirement": "wcag20:minimize-error-cues",
              "assertedBy": "_:evaluator",
              "subject": "_:website",
              "result": {
                "outcome": "earl:untested",
                "description": ""
              },
              "mode": "manual",
              "hasPart": []
            },
            {
              "type": "earl:assertion",
              "testRequirement": "wcag20:minimize-error-suggestions",
              "assertedBy": "_:evaluator",
              "subject": "_:website",
              "result": {
                "outcome": "earl:untested",
                "description": ""
              },
              "mode": "manual",
              "hasPart": []
            },
            {
              "type": "earl:assertion",
              "testRequirement": "wcag20:minimize-error-reversible",
              "assertedBy": "_:evaluator",
              "subject": "_:website",
              "result": {
                "outcome": "earl:untested",
                "description": ""
              },
              "mode": "manual",
              "hasPart": []
            },
            {
              "type": "earl:assertion",
              "testRequirement": "wcag20:ensure-compat-parses",
              "assertedBy": "_:evaluator",
              "subject": "_:website",
              "result": {
                "outcome": "earl:untested",
                "description": ""
              },
              "mode": "manual",
              "hasPart": []
            },
            {
              "type": "earl:assertion",
              "testRequirement": "wcag20:ensure-compat-rsv",
              "assertedBy": "_:evaluator",
              "subject": "_:website",
              "result": {
                "outcome": "earl:untested",
                "description": ""
              },
              "mode": "manual",
              "hasPart": []
            }
          ],
          "title": "REPORTTITLE",
          "commissioner": "COMMISSIONER",
          "date": "TODAY",
          "summary": "SUMMARIZE",
          "specifics": "SPECS",
          "creator": "_:evaluator",
          "structuredSample": {
            "webpage": [
              {
                "type": "webpage",
                "id": "_:struct_0",
                "description": "ADDRESS1",
                "handle": "SHORTNAME1",
                "tested": false
              },
              {
                "type": "webpage",
                "id": "_:struct_1",
                "description": "ADDRESS2",
                "handle": "SHORTNAME2",
                "tested": false
              }
            ]
          },
          "randomSample": {
            "webpage": [
              {
                "type": "webpage",
                "id": "_:rand_0",
                "description": "ADDRESS3",
                "handle": "SHORTNAME3",
                "tested": false
              }
            ]
          },
          "reliedUponTechnology": [
            {
              "title": "HTML5",
              "id": "http://www.w3.org/TR/html5/"
            },
            {
              "title": "CSS",
              "id": "http://www.w3.org/Style/CSS/specs/"
            }
          ],
          "essentialFunctionality": "ESSENTIALSTUFF",
          "pageTypeVariety": "VARIETY",
          "commonPages": [],
          "otherRelevantPages": []
        },
        {
          "@context": {
            "@vocab": "http://xmlns.com/foaf/spec/#",
            "id": "@id",
            "type": "@type"
          },
          "id": "_:evaluator",
          "type": "Person",
          "name": "EVALUATOR"
        }
      ]
    }
});
