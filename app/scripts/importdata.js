var importData = {
  "@context": {
    "@vocab": "http://www.w3.org/ns/earl#",
    "WCAG2": "http://www.w3.org/TR/WCAG20/#",
    "earl": "http://www.w3.org/ns/earl#",
    "dct": "http://purl.org/dc/terms/",
    "wai": "http://www.w3.org/WAI/",
    "sch": "https://schema.org/",
    "result": "earl:result",
    "Evaluation": "wcagem:Evaluation",
    "EvaluationScope": "wcagem:EvaluationScope",
    "TestSubject": "earl:TestSubject",
    "WebSite": "sch:WebSite",
    "Sample": "wcagem:Sample",
    "WebPage": "sch:WebPage",
    "Technology": "WCAG2:technologydef",
    "Assertion": "earl:Assertion",
    "Assertor": "earl:Assertor",
    "TestResult": "earl:TestResult",
    "title": "dct:title",
    "summary": "dct:summary",
    "creator": {
      "@id": "dct:creator",
      "@type": "@id"
    },
    "date": "dct:date",
    "description": "dct:description",
    "source": {
      "@id": "dct:source",
      "@type": "@id"
    },
    "test": {
      "@id": "earl:test",
      "@type": "@id"
    },
    "assertedBy": {
      "@id": "earl:assertedBy",
      "@type": "@id"
    },
    "subject": {
      "@id": "earl:subject",
      "@type": "@id"
    },
    "mode": {
      "@id": "earl:mode",
      "@type": "@id"
    },
    "hasPart": "dct:hasPart",
    "outcome": {
      "@id": "earl:outcome",
      "@type": "@id"
    },
    "findings": {
    	"@reverse": "subject"
    }
  },
  "@type": [
    "TestSubject",
    "WebPage"
  ],
  "@id": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
  "title": "O hai",
  "description": "http://localhost:9876/test/playground.html",
  "source": "http://localhost:9876/test/playground.html",
  "findings": [
    {
      "@type": "Assertion",
      "test": "WCAG2:text-equiv-all",
      "result": {
        "@type": "TestResult",
        "outcome": "failed",
        "description": "Ensures <area> elements of image maps have alternate text"
      },
      "hasPart": [
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/area-alt?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures <area> elements of image maps have alternate text",
            "pointer": []
          }
        },
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/image-alt?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "failed",
            "description": "Ensures <img> elements have alternate text or a role of none or presentation",
            "pointer": [
              {
                "cssPath": [
                  "body > img"
                ],
                "codeSnippet": "<img src=\"\">"
              }
            ]
          }
        },
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/input-image-alt?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures <input type=\"image\"> elements have alternate text",
            "pointer": []
          }
        },
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/link-name?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "passed",
            "description": "Ensures links have discernible text",
            "pointer": []
          }
        },
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/object-alt?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures <object> elements have alternate text",
            "pointer": []
          }
        }
      ]
    },
    {
      "@type": "Assertion",
      "test": "WCAG2:media-equiv-captions",
      "result": {
        "@type": "TestResult",
        "outcome": "notApplicable",
        "description": "Ensures <audio> elements have captions"
      },
      "hasPart": [
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/audio-caption?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures <audio> elements have captions",
            "pointer": []
          }
        },
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/video-caption?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures <video> elements have captions",
            "pointer": []
          }
        }
      ]
    },
    {
      "@type": "Assertion",
      "test": "WCAG2:media-equiv-audio-desc",
      "result": {
        "@type": "TestResult",
        "outcome": "notApplicable",
        "description": "Ensures <video> elements have captions"
      },
      "hasPart": [
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/video-caption?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures <video> elements have captions",
            "pointer": []
          }
        }
      ]
    },
    {
      "@type": "Assertion",
      "test": "WCAG2:media-equiv-audio-desc-only",
      "result": {
        "@type": "TestResult",
        "outcome": "notApplicable",
        "description": "Ensures <video> elements have audio descriptions"
      },
      "hasPart": [
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/video-description?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures <video> elements have audio descriptions",
            "pointer": []
          }
        }
      ]
    },
    {
      "@type": "Assertion",
      "test": "WCAG2:content-structure-separation-programmatic",
      "result": {
        "@type": "TestResult",
        "outcome": "notApplicable",
        "description": "Ensures elements with an ARIA role that require child roles contain them"
      },
      "hasPart": [
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/aria-required-children?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures elements with an ARIA role that require child roles contain them",
            "pointer": []
          }
        },
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/aria-required-parent?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures elements with an ARIA role that require parent roles are contained by them",
            "pointer": []
          }
        },
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/aria-roles?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures all elements with a role attribute use a valid value",
            "pointer": []
          }
        },
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/aria-valid-attr-value?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures all ARIA attributes have valid values",
            "pointer": []
          }
        },
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/data-table?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures data tables are marked up semantically and have the correct header structure",
            "pointer": []
          }
        },
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/definition-list?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures <dl> elements are structured correctly",
            "pointer": []
          }
        },
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/dlitem?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures <dt> and <dd> elements are contained by a <dl>",
            "pointer": []
          }
        },
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/label?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures every form element has a label",
            "pointer": []
          }
        },
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/layout-table?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures presentational <table> elements do not use <th>, <caption> elements or the summary attribute",
            "pointer": []
          }
        },
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/list?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures that lists are structured correctly",
            "pointer": []
          }
        },
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/listitem?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures <li> elements are used semantically",
            "pointer": []
          }
        }
      ]
    },
    {
      "@type": "Assertion",
      "test": "WCAG2:visual-audio-contrast-without-color",
      "result": {
        "@type": "TestResult",
        "outcome": "passed",
        "description": "Links can be distinguished without relying on color"
      },
      "hasPart": [
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/link-in-text-block?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "passed",
            "description": "Links can be distinguished without relying on color",
            "pointer": []
          }
        }
      ]
    },
    {
      "@type": "Assertion",
      "test": "WCAG2:visual-audio-contrast-contrast",
      "result": {
        "@type": "TestResult",
        "outcome": "passed",
        "description": "Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds"
      },
      "hasPart": [
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/color-contrast?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "passed",
            "description": "Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds",
            "pointer": []
          }
        }
      ]
    },
    {
      "@type": "Assertion",
      "test": "WCAG2:visual-audio-contrast-scale",
      "result": {
        "@type": "TestResult",
        "outcome": "notApplicable",
        "description": "Ensures <meta name=\"viewport\"> does not disable text scaling and zooming"
      },
      "hasPart": [
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/meta-viewport?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures <meta name=\"viewport\"> does not disable text scaling and zooming",
            "pointer": []
          }
        }
      ]
    },
    {
      "@type": "Assertion",
      "test": "WCAG2:keyboard-operation-keyboard-operable",
      "result": {
        "@type": "TestResult",
        "outcome": "notApplicable",
        "description": "Ensures every accesskey attribute value is unique"
      },
      "hasPart": [
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/accesskeys?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures every accesskey attribute value is unique",
            "pointer": []
          }
        },
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/server-side-image-map?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures that server-side image maps are not used",
            "pointer": []
          }
        }
      ]
    },
    {
      "@type": "Assertion",
      "test": "WCAG2:time-limits-required-behaviors",
      "result": {
        "@type": "TestResult",
        "outcome": "notApplicable",
        "description": "Ensures <meta http-equiv=\"refresh\"> is not used"
      },
      "hasPart": [
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/meta-refresh?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures <meta http-equiv=\"refresh\"> is not used",
            "pointer": []
          }
        }
      ]
    },
    {
      "@type": "Assertion",
      "test": "WCAG2:time-limits-pause",
      "result": {
        "@type": "TestResult",
        "outcome": "notApplicable",
        "description": "Ensures <blink> elements are not used"
      },
      "hasPart": [
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/blink?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures <blink> elements are not used",
            "pointer": []
          }
        },
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/marquee?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures <marquee> elements are not used",
            "pointer": []
          }
        }
      ]
    },
    {
      "@type": "Assertion",
      "test": "WCAG2:time-limits-postponed",
      "result": {
        "@type": "TestResult",
        "outcome": "notApplicable",
        "description": "Ensures <meta http-equiv=\"refresh\"> is not used"
      },
      "hasPart": [
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/meta-refresh?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures <meta http-equiv=\"refresh\"> is not used",
            "pointer": []
          }
        }
      ]
    },
    {
      "@type": "Assertion",
      "test": "WCAG2:navigation-mechanisms-skip",
      "result": {
        "@type": "TestResult",
        "outcome": "failed",
        "description": "Ensures each page has at least one mechanism for a user to bypass navigation and jump straight to the content"
      },
      "hasPart": [
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/bypass?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "failed",
            "description": "Ensures each page has at least one mechanism for a user to bypass navigation and jump straight to the content",
            "pointer": [
              {
                "cssPath": [
                  "html"
                ],
                "codeSnippet": "<html>"
              }
            ]
          }
        },
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/frame-title?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures <iframe> and <frame> elements contain a unique and non-empty title attribute",
            "pointer": []
          }
        }
      ]
    },
    {
      "@type": "Assertion",
      "test": "WCAG2:navigation-mechanisms-title",
      "result": {
        "@type": "TestResult",
        "outcome": "passed",
        "description": "Ensures each HTML document contains a non-empty <title> element"
      },
      "hasPart": [
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/document-title?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "passed",
            "description": "Ensures each HTML document contains a non-empty <title> element",
            "pointer": []
          }
        }
      ]
    },
    {
      "@type": "Assertion",
      "test": "WCAG2:meaning-doc-lang-id",
      "result": {
        "@type": "TestResult",
        "outcome": "failed",
        "description": "Ensures every HTML document has a lang attribute"
      },
      "hasPart": [
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/html-has-lang?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "failed",
            "description": "Ensures every HTML document has a lang attribute",
            "pointer": [
              {
                "cssPath": [
                  "html"
                ],
                "codeSnippet": "<html>"
              }
            ]
          }
        },
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/html-lang-valid?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures the lang attribute of the <html> element has a valid value",
            "pointer": []
          }
        }
      ]
    },
    {
      "@type": "Assertion",
      "test": "WCAG2:meaning-other-lang-id",
      "result": {
        "@type": "TestResult",
        "outcome": "notApplicable",
        "description": "Ensures lang attributes have valid values"
      },
      "hasPart": [
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/valid-lang?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures lang attributes have valid values",
            "pointer": []
          }
        }
      ]
    },
    {
      "@type": "Assertion",
      "test": "WCAG2:consistent-behavior-no-extreme-changes-context",
      "result": {
        "@type": "TestResult",
        "outcome": "notApplicable",
        "description": "Ensures <meta http-equiv=\"refresh\"> is not used"
      },
      "hasPart": [
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/meta-refresh?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures <meta http-equiv=\"refresh\"> is not used",
            "pointer": []
          }
        }
      ]
    },
    {
      "@type": "Assertion",
      "test": "WCAG2:minimize-error-cues",
      "result": {
        "@type": "TestResult",
        "outcome": "notApplicable",
        "description": "Ensures every form element has a label"
      },
      "hasPart": [
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/label?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures every form element has a label",
            "pointer": []
          }
        }
      ]
    },
    {
      "@type": "Assertion",
      "test": "WCAG2:ensure-compat-parses",
      "result": {
        "@type": "TestResult",
        "outcome": "failed",
        "description": "Ensures ARIA attributes are allowed for an element's role"
      },
      "hasPart": [
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/aria-allowed-attr?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures ARIA attributes are allowed for an element's role",
            "pointer": []
          }
        },
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/aria-required-attr?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures elements with ARIA roles have all required ARIA attributes",
            "pointer": []
          }
        },
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/aria-roles?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures all elements with a role attribute use a valid value",
            "pointer": []
          }
        },
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/aria-valid-attr-value?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures all ARIA attributes have valid values",
            "pointer": []
          }
        },
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/aria-valid-attr?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures attributes that begin with aria- are valid ARIA attributes",
            "pointer": []
          }
        },
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/duplicate-id?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "failed",
            "description": "Ensures every id attribute value is unique",
            "pointer": [
              {
                "cssPath": [
                  "body > div:nth-of-type(1)"
                ],
                "codeSnippet": "<div id=\"dupe\"></div>"
              }
            ]
          }
        }
      ]
    },
    {
      "@type": "Assertion",
      "test": "WCAG2:ensure-compat-rsv",
      "result": {
        "@type": "TestResult",
        "outcome": "passed",
        "description": "Ensures ARIA attributes are allowed for an element's role"
      },
      "hasPart": [
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/aria-allowed-attr?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures ARIA attributes are allowed for an element's role",
            "pointer": []
          }
        },
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/aria-required-attr?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures elements with ARIA roles have all required ARIA attributes",
            "pointer": []
          }
        },
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/aria-roles?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures all elements with a role attribute use a valid value",
            "pointer": []
          }
        },
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/aria-valid-attr-value?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures all ARIA attributes have valid values",
            "pointer": []
          }
        },
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/button-name?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "notApplicable",
            "description": "Ensures buttons have discernible text",
            "pointer": []
          }
        },
        {
          "@type": "Assertion",
          "test": "https://dequeuniversity.com/rules/axe/2.0/link-name?application=axeAPI",
          "subject": "_:1b8464e7-7811-46f2-9872-08f3b43847f5",
          "result": {
            "@type": "TestResult",
            "outcome": "passed",
            "description": "Ensures links have discernible text",
            "pointer": []
          }
        }
      ]
    }
  ]
}