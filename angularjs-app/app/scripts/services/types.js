'use strict';

angular
  .module('wcagReporter')
  .constant('types', {
    EARL: {
      type: 'earl',
      MODE: {
        type: 'earl:TestMode',
        MANUAL: 'earl:manual'
      },
      OUTCOME: {
        type: 'earl:OutcomeValue',
        CANNOT_TELL: 'earl:CannotTell',
        CANT_TELL: 'earl:cantTell',
        INAPPLICABLE: 'earl:inapplicable',
        FAIL: 'earl:Fail',
        FAILED: 'earl:failed',
        NOT_APPLICABLE: 'earl:NotApplicable',
        NOT_TESTED: 'earl:NotTested',
        PASS: 'earl:Pass',
        PASSED: 'earl:passed',
        UNTESTED: 'earl:untested'
      },
      RESULT: {
        class: 'TestResult',
        type: 'earl:TestResult'
      }
    }
  });
