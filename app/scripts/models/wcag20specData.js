'use strict';
/**
 * Originally created by Justin Marsan
 * https://github.com/justinmarsan/wcag.json
 */
angular.module('wcagReporter')
.factory('wcag20specData', function () {
	return [{
      "number": "1",
      "title": "Perceivable",
      "uri": "wcag20:perceivable",
      "description": "Information and user interface components must be presentable to users in ways they can perceive.",
      "guidelines": [{
        "number": "1.1",
        "title": "Text Alternatives",
        "uri": "wcag20:text-equiv",
        "description": "Provide text alternatives for any non-text content so that it can be changed into other forms people need, such as large print, braille, speech, symbols or simpler language.",
        "criteria": [{
          "number": "1.1.1",
          "title": "Non-text Content",
          "level": "wcag20:level_a",
          "uri": "wcag20:text-equiv-all",
          "description": "All non-text content that is presented to the user has a text alternative that serves the equivalent purpose, except for the situations listed below.",
          "specific_cases": [{
            "title": "Controls, Input",
            "description": "If non-text content is a control or accepts user input, then it has a name that describes its purpose. (Refer to Guideline 4.1 for additional requirements for controls and content that accepts user input.)"
          }, {
            "title": "Time-Based Media",
            "description": "If non-text content is time-based media, then text alternatives at least provide descriptive identification of the non-text content. (Refer to Guideline 1.2 for additional requirements for media.)"
          }, {
            "title": "Test",
            "description": "If non-text content is a test or exercise that would be invalid if presented in text, then text alternatives at least provide descriptive identification of the non-text content."
          }, {
            "title": "Sensory",
            "description": "If non-text content is primarily intended to create a specific sensory experience, then text alternatives at least provide descriptive identification of the non-text content."
          }, {
            "title": "CAPTCHA",
            "description": "If the purpose of non-text content is to confirm that content is being accessed by a person rather than a computer, then text alternatives that identify and describe the purpose of the non-text content are provided, and alternative forms of CAPTCHA using output modes for different types of sensory perception are provided to accommodate different disabilities."
          }, {
            "title": "Decoration, Formatting, Invisible",
            "description": "If non-text content is pure decoration, is used only for visual formatting, or is not presented to users, then it is implemented in a way that it can be ignored by assistive technology."
          }]
        }]
      }, {
        "number": "1.2",
        "title": "Time-based Media",
        "uri": "wcag20:media-equiv",
        "description": "Provide alternatives for time-based media.",
        "criteria": [{
          "number": "1.2.1",
          "title": "Audio-only and Video-only (Prerecorded)",
          "level": "wcag20:level_a",
          "uri": "wcag20:media-equiv-av-only-alt",
          "description": "For prerecorded audio-only and prerecorded video-only media, the following are true, except when the audio or video is a media alternative for text and is clearly labeled as such",
          "specific_cases": [{
            "title": "Prerecorded Audio-only",
            "description": "An alternative for time-based media is provided that presents equivalent information for prerecorded audio-only content."
          }, {
            "title": "Prerecorded Video-only",
            "description": "Either an alternative for time-based media or an audio track is provided that presents equivalent information for prerecorded video-only content."
          }]
        }, {
          "number": "1.2.2",
          "title": "Captions (Prerecorded)",
          "level": "wcag20:level_a",
          "uri": "wcag20:media-equiv-captions",
          "description": "Captions are provided for all prerecorded audio content in synchronized media, except when the media is a media alternative for text and is clearly labeled as such.",
          "specific_cases": []
        }, {
          "number": "1.2.3",
          "title": "Audio Description or Media Alternative (Prerecorded)",
          "level": "wcag20:level_a",
          "uri": "wcag20:media-equiv-audio-desc",
          "description": "An alternative for time-based media or audio description of the prerecorded video content is provided for synchronized media, except when the media is a media alternative for text and is clearly labeled as such.",
          "specific_cases": []
        }, {
          "number": "1.2.4",
          "title": "Captions (Live)",
          "level": "wcag20:level_aa",
          "uri": "wcag20:media-equiv-real-time-captions",
          "description": "Captions are provided for all live audio content in synchronized media.",
          "specific_cases": []
        }, {
          "number": "1.2.5",
          "title": "Audio Description (Prerecorded)",
          "level": "wcag20:level_aa",
          "uri": "wcag20:media-equiv-audio-desc-only",
          "description": "Audio description is provided for all prerecorded video content in synchronized media.",
          "specific_cases": []
        }, {
          "number": "1.2.6",
          "title": "Sign Language (Prerecorded)",
          "level": "wcag20:level_aaa",
          "uri": "wcag20:media-equiv-sign",
          "description": "Sign language interpretation is provided for all prerecorded audio content in synchronized media.",
          "specific_cases": []
        }, {
          "number": "1.2.7",
          "title": "Extended Audio Description  (Prerecorded)",
          "level": "wcag20:level_aaa",
          "uri": "wcag20:media-equiv-extended-ad",
          "description": "Where pauses in foreground audio are insufficient to allow audio descriptions to convey the sense of the video, extended audio description is provided for all prerecorded video content in synchronized media.",
          "specific_cases": []
        }, {
          "number": "1.2.8",
          "title": "Media Alternative (Prerecorded)",
          "level": "wcag20:level_aaa",
          "uri": "wcag20:media-equiv-text-doc",
          "description": "An alternative for time-based media is provided for all prerecorded synchronized media and for all prerecorded video-only media.",
          "specific_cases": []
        }, {
          "number": "1.2.9",
          "title": "Audio-only (Live)",
          "level": "wcag20:level_aaa",
          "uri": "wcag20:media-equiv-live-audio-only",
          "description": "An alternative for time-based media that presents equivalent information for live audio-only content is provided.",
          "specific_cases": []
        }]
      }, {
        "number": "1.3",
        "title": "Adaptable",
        "uri": "wcag20:content-structure-separation",
        "description": "Create content that can be presented in different ways (for example simpler layout) without losing information or structure.",
        "criteria": [{
          "title": "Info and Relationships",
          "description": "Information, structure, and relationships conveyed through presentation can be programmatically determined or are available in text.",
          "level": "wcag20:level_a",
          "specific_cases": [],
          "number": "1.3.1",
          "uri": "wcag20:content-structure-separation-programmatic"
        }, {
          "title": "Meaningful Sequence",
          "description": "When the sequence in which content is presented affects its meaning, a correct reading sequence can be programmatically determined.",
          "level": "wcag20:level_a",
          "specific_cases": [],
          "number": "1.3.2",
          "uri": "wcag20:content-structure-separation-sequence"
        }, {
          "title": "Sensory Characteristics",
          "description": "Instructions provided for understanding and operating content do not rely solely on sensory characteristics of components such as shape, size, visual location, orientation, or sound.",
          "level": "wcag20:level_a",
          "specific_cases": [],
          "number": "1.3.3",
          "uri": "wcag20:content-structure-separation-understanding"
        }]
      }, {
        "number": "1.4",
        "title": "Distinguishable",
        "uri": "wcag20:visual-audio-contrast",
        "description": "Make it easier for users to see and hear content including separating foreground from background.",
        "criteria": [{
          "title": "Use of Color",
          "description": "Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.",
          "level": "wcag20:level_a",
          "specific_cases": [],
          "number": "1.4.1",
          "uri": "wcag20:visual-audio-contrast-without-color"
        }, {
          "title": "Audio Control",
          "description": "If any audio on a Web page plays automatically for more than 3 seconds, either a mechanism is available to pause or stop the audio, or a mechanism is available to control audio volume independently from the overall system volume level.",
          "level": "wcag20:level_a",
          "specific_cases": [],
          "number": "1.4.2",
          "uri": "wcag20:visual-audio-contrast-dis-audio"
        }, {
          "title": "Contrast (Minimum)",
          "description": "The visual presentation of text and images of text has a contrast ratio of at least 4.5:1, except for the following:",
          "level": "wcag20:level_aa",
          "specific_cases": [{
            "title": "Large Text",
            "description": "Large-scale text and images of large-scale text have a contrast ratio of at least 3:1;"
          }, {
            "title": "Incidental",
            "description": "Text or images of text that are part of an inactive user interface component, that are pure decoration, that are not visible to anyone, or that are part of a picture that contains significant other visual content, have no contrast requirement."
          }, {
            "title": "Logotypes",
            "description": "Text that is part of a logo or brand name has no minimum contrast requirement."
          }],
          "number": "1.4.3",
          "uri": "wcag20:visual-audio-contrast-"
        }, {
          "title": "Resize text",
          "description": "Except for captions and images of text, text can be resized without assistive technology up to 200 percent without loss of content or functionality.",
          "level": "wcag20:level_aa",
          "specific_cases": [],
          "number": "1.4.4",
          "uri": "wcag20:visual-audio-contrast-scale"
        }, {
          "title": "Images of Text",
          "description": "If the technologies being used can achieve the visual presentation, text is used to convey information rather than images of text except for the following:",
          "level": "wcag20:level_aa",
          "specific_cases": [{
            "title": "Customizable",
            "description": "The image of text can be visually customized to the user's requirements;"
          }, {
            "title": "Essential",
            "description": "A particular presentation of text is essential to the information being conveyed."
          }],
          "number": "1.4.5",
          "uri": "wcag20:visual-audio-contrast-text-presentation"
        }, {
          "title": "Contrast (Enhanced)",
          "description": "The visual presentation of text and images of text has a contrast ratio of at least 7:1, except for the following:",
          "level": "wcag20:level_aaa",
          "specific_cases": [{
            "title": "Large Text",
            "description": "Large-scale text and images of large-scale text have a contrast ratio of at least 4.5:1;"
          }, {
            "title": "Incidental",
            "description": "Text or images of text that are part of an inactive user interface component, that are pure decoration, that are not visible to anyone, or that are part of a picture that contains significant other visual content, have no contrast requirement."
          }, {
            "title": "Logotypes",
            "description": "Text that is part of a logo or brand name has no minimum contrast requirement."
          }],
          "number": "1.4.6",
          "uri": "wcag20:visual-audio-contrast7"
        }, {
          "title": "Low or No Background Audio",
          "description": "For prerecorded audio-only content that (1) contains primarily speech in the foreground, (2) is not an audio CAPTCHA or audio logo, and (3) is not vocalization intended to be primarily musical expression such as singing or rapping, at least one of the following is true",
          "level": "wcag20:level_aaa",
          "specific_cases": [{
            "title": "No Background",
            "description": "The audio does not contain background sounds."
          }, {
            "title": "Turn Off",
            "description": "The background sounds can be turned off."
          }, {
            "title": "20 dB",
            "description": "The background sounds are at least 20 decibels lower than the foreground speech content, with the exception of occasional sounds that last for only one or two seconds."
          }],
          "number": "1.4.7",
          "uri": "wcag20:visual-audio-contrast-noaudio"
        }, {
          "title": "Visual Presentation",
          "description": "For the visual presentation of blocks of text, a mechanism is available to achieve the following",
          "level": "wcag20:level_aaa",
          "number": "1.4.8",
          "uri": "wcag20:visual-audio-contrast-visual-presentation",
          "specific_cases": [{
            "title": "", "description": "Foreground and background colors can be selected by the user."
          }, {
            "title": "", "description": "Width is no more than 80 characters or glyphs (40 if CJK)."
          }, {
            "title": "", "description": "Text is not justified (aligned to both the left and the right margins)."
          }, {
            "title": "", "description": "Line spacing (leading) is at least space-and-a-half within paragraphs, and paragraph spacing is at least 1.5 times larger than the line spacing."
          }, {
            "title": "", "description": "Text can be resized without assistive technology up to 200 percent in a way that does not require the user to scroll horizontally to read a line of text on a full-screen window."
          }]
        }, {
          "title": "Images of Text (No Exception)",
          "description": "Images of text are only used for pure decoration or where a particular presentation of text is essential to the information being conveyed.",
          "level": "wcag20:level_aaa",
          "specific_cases": [],
          "number": "1.4.9",
          "uri": "wcag20:visual-audio-contrast-text-images"
        }]
      }]
    }, {
      "number": "2",
      "title": "Operable",
      "uri": "wcag20:operable",
      "description": "User interface components and navigation must be operable.",
      "guidelines": [{
        "title": "Keyboard Accessible",
        "description": "Make all functionality available from a keyboard.",
        "number": "2.1",
        "criteria": [{
          "title": "Keyboard",
          "description": "All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes, except where the underlying function requires input that depends on the path of the user's movement and not just the endpoints.",
          "level": "wcag20:level_a",
          "specific_cases": [],
          "number": "2.1.1",
          "uri": "wcag20:keyboard-operation-keyboard-operable"
        }, {
          "title": "No Keyboard Trap",
          "description": "If keyboard focus can be moved to a component of the page using a keyboard interface, then focus can be moved away from that component using only a keyboard interface, and, if it requires more than unmodified arrow or tab keys or other standard exit methods, the user is advised of the method for moving focus away.",
          "level": "wcag20:level_a",
          "specific_cases": [],
          "number": "2.1.2",
          "uri": "wcag20:keyboard-operation-trapping"
        }, {
          "title": "Keyboard (No Exception)",
          "description": "All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes.",
          "level": "wcag20:level_aaa",
          "specific_cases": [],
          "number": "2.1.3",
          "uri": "wcag20:keyboard-operation-all-funcs"
        }],
        "uri": "wcag20:keyboard-operation"
      }, {
        "title": "Enough Time",
        "description": "Provide users enough time to read and use content.",
        "number": "2.2",
        "criteria": [{
          "title": "Timing Adjustable",
          "description": "For each time limit that is set by the content, at least one of the following is true:",
          "level": "wcag20:level_a",
          "specific_cases": [{
            "title": "Turn off",
            "description": "The user is allowed to turn off the time limit before encountering it; or"
          }, {
            "title": "Adjust",
            "description": "The user is allowed to adjust the time limit before encountering it over a wide range that is at least ten times the length of the default setting; or"
          }, {
            "title": "Extend",
            "description": "The user is warned before time expires and given at least 20 seconds to extend the time limit with a simple action (for example, \"press the space bar\"), and the user is allowed to extend the time limit at least ten times; or"
          }, {
            "title": "Real-time Exception",
            "description": "The time limit is a required part of a real-time event (for example, an auction), and no alternative to the time limit is possible; or"
          }, {
            "title": "Essential Exception",
            "description": "The time limit is essential and extending it would invalidate the activity; or"
          }, {
            "title": "20 Hour Exception",
            "description": "The time limit is longer than 20 hours."
          }],
          "number": "2.2.1",
          "uri": "wcag20:time-limits-required-behaviors"
        }, {
          "title": "Pause, Stop, Hide",
          "description": "For moving, blinking, scrolling, or auto-updating information, all of the following are true",
          "level": "wcag20:level_a",
          "specific_cases": [{
            "title": "Moving, blinking, scrolling",
            "description": "For any moving, blinking or scrolling information that (1) starts automatically, (2) lasts more than five seconds, and (3) is presented in parallel with other content, there is a mechanism for the user to pause, stop, or hide it unless the movement, blinking, or scrolling is part of an activity where it is essential; and"
          }, {
            "title": "Auto-updating",
            "description": "For any auto-updating information that (1) starts automatically and (2) is presented in parallel with other content, there is a mechanism for the user to pause, stop, or hide it or to control the frequency of the update unless the auto-updating is part of an activity where it is essential."
          }],
          "number": "2.2.2",
          "uri": "wcag20:time-limits-pause"
        }, {
          "title": "No Timing",
          "description": "Timing is not an essential part of the event or activity presented by the content, except for non-interactive synchronized media and real-time events.",
          "level": "wcag20:level_aaa",
          "specific_cases": [],
          "number": "2.2.3",
          "uri": "wcag20:time-limits-no-exceptions"
        }, {
          "title": "Interruptions",
          "description": "Interruptions can be postponed or suppressed by the user, except interruptions involving an emergency.",
          "level": "wcag20:level_aaa",
          "specific_cases": [],
          "number": "2.2.4",
          "uri": "wcag20:time-limits-postponed"
        }, {
          "title": "Re-authenticating",
          "description": "When an authenticated session expires, the user can continue the activity without loss of data after re-authenticating.",
          "level": "wcag20:level_aaa",
          "specific_cases": [],
          "number": "2.2.5",
          "uri": "wcag20:time-limits-server-timeout"
        }],
        "uri": "wcag20:time-limits"
      }, {
        "title": "Seizures",
        "description": "Do not design content in a way that is known to cause seizures.",
        "number": "2.3",
        "criteria": [{
          "title": "Three Flashes or Below Threshold",
          "description": "Web pages do not contain anything that flashes more than three times in any one second period, or the flash is below the general flash and red flash thresholds.",
          "level": "wcag20:level_a",
          "specific_cases": [],
          "number": "2.3.1",
          "uri": "wcag20:seizure-does-not-violate"
        }, {
          "title": "Three Flashes",
          "description": "Web pages do not contain anything that flashes more than three times in any one second period.",
          "level": "wcag20:level_aaa",
          "specific_cases": [],
          "number": "2.3.2",
          "uri": "wcag20:seizure-three-times"
        }],
        "uri": "wcag20:seizure"
      }, {
        "title": "Navigable",
        "description": "Provide ways to help users navigate, find content, and determine where they are.",
        "number": "2.4",
        "criteria": [{
          "title": "Bypass Blocks",
          "description": "A mechanism is available to bypass blocks of content that are repeated on multiple Web pages.",
          "level": "wcag20:level_a",
          "specific_cases": [],
          "number": "2.4.1",
          "uri": "wcag20:navigation-mechanisms-skip"
        }, {
          "title": "Page Titled",
          "description": "Web pages have titles that describe topic or purpose.",
          "level": "wcag20:level_a",
          "specific_cases": [],
          "number": "2.4.2",
          "uri": "wcag20:navigation-mechanisms-title"
        }, {
          "title": "Focus Order",
          "description": "If a Web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operability.",
          "level": "wcag20:level_a",
          "specific_cases": [],
          "number": "2.4.3",
          "uri": "wcag20:navigation-mechanisms-focus-order"
        }, {
          "title": "Link Purpose (In Context)",
          "description": "The purpose of each link can be determined from the link text alone or from the link text together with its programmatically determined link context, except where the purpose of the link would be ambiguous to users in general.",
          "level": "wcag20:level_a",
          "specific_cases": [],
          "number": "2.4.4",
          "uri": "wcag20:navigation-mechanisms-refs"
        }, {
          "title": "Multiple Ways",
          "description": "More than one way is available to locate a Web page within a set of Web pages except where the Web Page is the result of, or a step in, a process.",
          "level": "wcag20:level_aa",
          "specific_cases": [],
          "number": "2.4.5",
          "uri": "wcag20:navigation-mechanisms-mult-loc"
        }, {
          "title": "Headings and Labels",
          "description": "Headings and labels describe topic or purpose.",
          "level": "wcag20:level_aa",
          "specific_cases": [],
          "number": "2.4.6",
          "uri": "wcag20:navigation-mechanisms-descriptive"
        }, {
          "title": "Focus Visible",
          "description": "Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible.",
          "level": "wcag20:level_aa",
          "specific_cases": [],
          "number": "2.4.7",
          "uri": "wcag20:navigation-mechanisms-focus-visible"
        }, {
          "title": "Location",
          "description": "Information about the user's location within a set of Web pages is available.",
          "level": "wcag20:level_aaa",
          "specific_cases": [],
          "number": "2.4.8",
          "uri": "wcag20:navigation-mechanisms-location"
        }, {
          "title": "Link Purpose (Link Only)",
          "description": "A mechanism is available to allow the purpose of each link to be identified from link text alone, except where the purpose of the link would be ambiguous to users in general.",
          "level": "wcag20:level_aaa",
          "specific_cases": [],
          "number": "2.4.9",
          "uri": "wcag20:navigation-mechanisms-link"
        }, {
          "title": "Section Headings",
          "description": "Section headings are used to organize the content.",
          "level": "wcag20:level_aaa",
          "specific_cases": [],
          "number": "2.4.10",
          "uri": "wcag20:navigation-mechanisms-headings"
        }],
        "uri": "wcag20:navigation-mechanisms"
      }]
    }, {
      "number": "3",
      "title": "Understandable",
      "uri": "wcag20:understandable",
      "description": "Information and the operation of user interface must be understandable.",
      "guidelines": [{
        "number": "3.1",
        "title": "Readable",
        "uri": "wcag20:meaning",
        "description": "Make text content readable and understandable.",
        "criteria": [{
          "title": "Language of Page",
          "description": "The default human language of each Web page can be programmatically determined.",
          "level": "wcag20:level_a",
          "specific_cases": [],
          "number": "3.1.1",
          "uri": "wcag20:meaning-doc-lang-id"
        }, {
          "title": "Language of Parts",
          "description": "The human language of each passage or phrase in the content can be programmatically determined except for proper names, technical terms, words of indeterminate language, and words or phrases that have become part of the vernacular of the immediately surrounding text.",
          "level": "wcag20:level_aa",
          "specific_cases": [],
          "number": "3.1.2",
          "uri": "wcag20:meaning-other-lang-id"
        }, {
          "title": "Unusual Words",
          "description": "A mechanism is available for identifying specific definitions of words or phrases used in an unusual or restricted way, including idioms and jargon.",
          "level": "wcag20:level_aaa",
          "specific_cases": [],
          "number": "3.1.3",
          "uri": "wcag20:meaning-idioms"
        }, {
          "title": "Abbreviations",
          "description": "A mechanism for identifying the expanded form or meaning of abbreviations is available.",
          "level": "wcag20:level_aaa",
          "specific_cases": [],
          "number": "3.1.4",
          "uri": "wcag20:meaning-located"
        }, {
          "title": "Reading Level",
          "description": "When text requires reading ability more advanced than the lower secondary education level after removal of proper names and titles, supplemental content, or a version that does not require reading ability more advanced than the lower secondary education level, is available.",
          "level": "wcag20:level_aaa",
          "specific_cases": [],
          "number": "3.1.5",
          "uri": "wcag20:meaning-supplements"
        }, {
          "title": "Pronunciation",
          "description": "A mechanism is available for identifying specific pronunciation of words where meaning of the words, in context, is ambiguous without knowing the pronunciation.",
          "level": "wcag20:level_aaa",
          "specific_cases": [],
          "number": "3.1.6",
          "uri": "wcag20:meaning-pronunciation"
        }]
      }, {
        "number": "3.2",
        "title": "Predictable",
        "description": "Make Web pages appear and operate in predictable ways.",
        "uri": "wcag20:consistent-behavior",
        "criteria": [{
          "title": "On Focus",
          "description": "When any component receives focus, it does not initiate a change of context.",
          "level": "wcag20:level_a",
          "specific_cases": [],
          "number": "3.2.1",
          "uri": "wcag20:consistent-behavior-receive-focus"
        }, {
          "title": "On Input",
          "description": "Changing the setting of any user interface component does not automatically cause a change of context unless the user has been advised of the behavior before using the component.",
          "level": "wcag20:level_a",
          "specific_cases": [],
          "number": "3.2.2",
          "uri": "wcag20:consistent-behavior-unpredictable-change"
        }, {
          "number": "3.2.3",
          "title": "Consistent Navigation",
          "level": "wcag20:level_aa",
          "uri": "wcag20:consistent-behavior-consistent-locations",
          "description": "Navigational mechanisms that are repeated on multiple Web pages within a set of Web pages occur in the same relative order each time they are repeated, unless a change is initiated by the user.",
          "specific_cases": []
        }, {
          "number": "3.2.4",
          "title": "Consistent Identification",
          "level": "wcag20:level_aa",
          "uri": "wcag20:consistent-behavior-consistent-functionality",
          "description": "Components that have the same functionality within a set of Web pages are identified consistently.",
          "specific_cases": []
        }, {
          "number": "3.2.5",
          "title": "Change on Request",
          "level": "wcag20:level_aaa",
          "uri": "wcag20:consistent-behavior-no-extreme-changes-context",
          "description": "Changes of context are initiated only by user request or a mechanism is available to turn off such changes.",
          "specific_cases": []
        }]
      }, {
        "number": "3.3",
        "title": "Input Assistance",
        "uri": "wcag20:minimize-error",
        "description": "Help users avoid and correct mistakes.",
        "criteria": [{
          "number": "3.3.1",
          "title": "Error Identification",
          "description": "If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.",
          "level": "wcag20:level_a",
          "specific_cases": [],
          "uri": "wcag20:minimize-error-identified"
        }, {
          "title": "Labels or Instructions",
          "description": "Labels or instructions are provided when content requires user input.",
          "level": "wcag20:level_a",
          "specific_cases": [],
          "number": "3.3.2",
          "uri": "wcag20:minimize-error-cues"
        }, {
          "title": "Error Suggestion",
          "description": "If an input error is automatically detected and suggestions for correction are known, then the suggestions are provided to the user, unless it would jeopardize the security or purpose of the content.",
          "level": "wcag20:level_aa",
          "specific_cases": [],
          "number": "3.3.3",
          "uri": "wcag20:minimize-error-suggestions"
        }, {
          "title": "Error Prevention (Legal, Financial, Data)",
          "description": "For Web pages that cause legal commitments or financial transactions for the user to occur, that modify or delete user-controllable data in data storage systems, or that submit user test responses, at least one of the following is true",
          "level": "wcag20:level_aa",
          "number": "3.3.4",
          "uri": "wcag20:minimize-error-reversible",
          "specific_cases": [{
            "title": "Reversible",
            "description": "Submissions are reversible."
          }, {
            "title": "Checked",
            "description": "Data entered by the user is checked for input errors and the user is provided an opportunity to correct them."
          }, {
            "title": "Confirmed",
            "description": "A mechanism is available for reviewing, confirming, and correcting information before finalizing the submission."
          }]
        }, {
          "title": "Help",
          "description": "Context-sensitive help is available.",
          "level": "wcag20:level_aaa",
          "specific_cases": [],
          "number": "3.3.5",
          "uri": "wcag20:minimize-error-context-help"
        }, {
          "title": "Error Prevention (All)",
          "description": "For Web pages that require the user to submit information, at least one of the following is true:",
          "level": "wcag20:level_aaa",
          "number": "3.3.6",
          "uri": "wcag20:minimize-error-reversible-all",
          "specific_cases": [{
            "title": "Reversible",
            "description": "Submissions are reversible."
          }, {
            "title": "Checked",
            "description": "Data entered by the user is checked for input errors and the user is provided an opportunity to correct them."
          }, {
            "title": "Confirmed",
            "description": "A mechanism is available for reviewing, confirming, and correcting information before finalizing the submission."
          }]
        }]
      }]
    }, {
      "number": "4",
      "title": "Robust",
      "uri": "wcag20:robust",
      "description": "Content must be robust enough that it can be interpreted reliably by a wide variety of user agents, including assistive technologies.",
      "guidelines": [{
        "number": "4.1",
        "title": "Compatible",
        "uri": "wcag20:ensure-compat",
        "description": "Maximize compatibility with current and future user agents, including assistive technologies.",
        "criteria": [{
          "number": "4.1.1",
          "title": "Parsing",
          "description": "In content implemented using markup languages, elements have complete start and end tags, elements are nested according to their specifications, elements do not contain duplicate attributes, and any IDs are unique, except where the specifications allow these features.",
          "level": "wcag20:level_a",
          "specific_cases": [],
          "uri": "wcag20:ensure-compat-parses"
        }, {
          "number": "4.1.2",
          "title": "Name, Role, Value",
          "description": "For all user interface components (including but not limited to: form elements, links and components generated by scripts), the name and role can be programmatically determined; states, properties, and values that can be set by the user can be programmatically set; and notification of changes to these items is available to user agents, including assistive technologies.",
          "level": "wcag20:level_a",
          "specific_cases": [],
          "uri": "wcag20:ensure-compat-rsv"
        }]
      }]
    }];
});
