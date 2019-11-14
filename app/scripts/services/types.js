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
        UNTESTED: 'earl:untested'
      },
      RESULT: {
        class: 'TestResult',
        type: 'earl:TestResult'
      }
    }
  });
