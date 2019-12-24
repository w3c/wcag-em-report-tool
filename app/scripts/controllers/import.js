'use strict';

angular
  .module('wcagReporter')
  .controller('ImportCtrl', function (
    fileReader,
    $scope,
    $rootScope,
    evalContextV3,
    evalModel,
    types
  ) {
    var JSONLD = window.jsonld;
    var FEEDBACK = {
      ERROR: {
        type: 'danger',
        message: 'Import error'
      },
      PENDING: {
        type: 'info',
        message: 'Import pending...'
      },
      SUCCESS: {
        type: 'success',
        message: 'Import successfull'
      }
    };

    $scope.assertionImport = [];

    $scope.allowedMime = [
      'application/json',
      'application/ld+json'
    ].join(',');

    $scope.feedback = false;
    $scope.importFile = undefined;
    $scope.importConfirmed = undefined;

    /**
     * Assertions that get imported need to be validated against
     * 1. test: should be directly known / related to WCAG
     * 2. subject should be related to one of the samples
     * 3. result: being an earl:TestResult
     * 4. assertedBy: Nice to know who / what made this assertion
     * @param  {earl:Assertion} assertion [description]
     * @return {boolean}           validity
     */
    function isValidAssertion (assertion) {
      function hasRequiredKeys (_assertion) {
        var assertionKeys = Object.keys(_assertion);
        var requiredKeys = [
          'test',
          'subject',
          'result',
          'assertedBy'
        ];

        var missingKeys = [];
        var key;

        for (key in requiredKeys) {
          if (assertionKeys.indexOf(requiredKeys[key]) === -1) {
            missingKeys.push(requiredKeys[key]);
          }
        }

        if (missingKeys.length > 0) {
          return false;
        }

        return true;
      }

      function isSampleRelated (subject) {
        var sampleUrls = evalModel.sampleModel.getPages()
          .map(function getUrls (page) {
            var pageUrl;

            if (page.source !== undefined) {
              try {
                pageUrl = new URL(page.source);
              } catch (e) {
                console.error(e);

                return page.source;
              }

              return pageUrl.href;
            }
          });

        var subjectUrl = '';

        if (typeof subject === 'string') {
          try {
            subjectUrl = new URL(subject).href;
          } catch (e) {
            console.error('Expected valid url in import assertion subject.');

            return false;
          }
        }

        if (
          typeof subject === 'object' &&
          subject.toString() === '[object Object]' &&
          subject.source !== undefined
        ) {
          try {
            subjectUrl = new URL(subject.source).href;
          } catch (e) {
            console.error('Expected valid url in import assertion subject.');

            return false;
          }
        }

        return (sampleUrls.indexOf(subjectUrl) >= 0);
      }

      function isWcagRelated (assertionTest) {
        function wcagIn (text) {
          return text.indexOf('WCAG') >= 0;
        }

        // Mark the assertion.test with an WCAG id
        // to easily match to a criterion in the auditModel when updating.
        // It may be found top level or deep nested, finding test.wcagId is certain.
        function setWcagIdonTest (wcagId, test) {
          test.wcagId = wcagId;
        }

        if (
          typeof assertionTest === 'string' &&
          wcagIn(assertionTest)
        ) {
          return true;
        }

        if (
          typeof assertionTest === 'object' &&
          assertionTest.id !== undefined &&
          wcagIn(assertionTest.id)
        ) {
          setWcagIdonTest(assertionTest.id, assertionTest);
          return true;
        }

        if (
          typeof assertionTest === 'object' &&
          assertionTest.isPartOf !== undefined &&
          typeof assertionTest.isPartOf === 'string' &&
          wcagIn(assertionTest.isPartOf)
        ) {
          setWcagIdonTest(assertionTest.isPartOf, assertionTest);
          return true;
        }

        return false;
      }

      function hasResult (_assertion) {
        var result = _assertion.result;

        function hasOutcomeValue (_result) {
          var earlOutcome = types.EARL.OUTCOME;
          var outcomeValues = [
            earlOutcome.PASSED,
            earlOutcome.FAILED,
            earlOutcome.CANT_TELL,
            earlOutcome.INAPPLICABLE,
            earlOutcome.UNTESTED
          ];
          var outcomeClasses = [
            earlOutcome.PASS,
            earlOutcome.FAIL,
            earlOutcome.CANNOT_TELL,
            earlOutcome.NOT_APPLICABLE,
            earlOutcome.NOT_TESTED
          ];

          if (_result.outcome === undefined) {
            return false;
          }

          if (typeof _result.outcome === 'string') {
            return outcomeValues.indexOf(_result.outcome) >= 0;
          }

          if (
            typeof _result.outcome === 'object' &&
            _result.outcome['@type'] !== undefined
          ) {
            return outcomeClasses.indexOf(_result.outcome['@type']) >= 0;
          }
        }

        if (!hasOutcomeValue(result)) {
          return false;
        }

        return true;
      }

      if (!hasRequiredKeys(assertion)) {
        return false;
      }

      if (!isSampleRelated(assertion.subject)) {
        return false;
      }

      if (!isWcagRelated(assertion.test)) {
        return false;
      }

      if (!hasResult(assertion)) {
        return false;
      }

      return true;
    }

    /**
     * Tries to insert all found assertions from the import
     * into the auditModel specific criteria
     */
    function insertAssertions () {
      var assertions = $scope.assertionImport;
      var assertionsCount = assertions.length;
      var assertion, wcagId;

      for (var i = 0; i < assertionsCount; i++) {
        assertion = assertions[i];
        wcagId = assertion.wcagId || assertion.test;
        evalModel.auditModel.updateCritAssert(wcagId, assertion);
      }
    }

    function resetImport () {
      $scope.feedback = false;
      $scope.importFile = undefined;
      $scope.importConfirmed = undefined;
      $scope.assertionImport.length = 0;
    }

    function handleLoad (defer, feedback) {
      defer.then(
        function success (result) {
          var resultJson = JSON.parse(result);
          var context = angular.copy(evalContextV3);
          context.isPartOf = 'dct:isPartOf';

          JSONLD.frame(
            resultJson,
            {
              '@context': context,
              '@graph': [
                {
                  '@type': 'Assertion'
                }
              ]
            },
            function (error, framed) {
              if (error) {
                feedback = FEEDBACK.ERROR;
                feedback.message = error.message;
                return;
              }

              var graph = framed['@graph'];
              var graphSize = graph.length;
              var currentAssertion;

              for (var i = 0; i < graphSize; i++) {
                currentAssertion = graph[i];

                if (isValidAssertion(currentAssertion)) {
                  $scope.assertionImport.push(currentAssertion);
                }
              }

              if ($scope.assertionImport.length > 0) {
                $scope.feedback = {
                  type: FEEDBACK.SUCCESS.type,
                  message: 'Ready to import ' + $scope.assertionImport.length + ' assertions.'
                };
              }

              $scope.$apply();
            }
          );
        },
        function error (e) {
          feedback = FEEDBACK.ERROR;
          if (e.message) {
            feedback.message = e.message;
          } else {
            feedback.message = e;
          }
        }
      );
    }

    function isJson (file) {
      if ($scope.allowedMime.indexOf(file.type) >= 0) {
        return true;
      }

      return false;
    }

    $scope.loadFile = function loadFile (source) {
      $scope.feedback = FEEDBACK.PENDING;

      if (!isJson(source)) {
        $scope.feedback = FEEDBACK.ERROR;
        $scope.feedback.message = 'Expected to open a json-file, the filename must end with either “.json” or “.jsonld”.';
        $scope.$apply();

        return;
      }

      $scope.importFile = {
        name: source.name
      };

      handleLoad(fileReader.readAsText(source, $scope), $scope.feedback);
    };

    $scope.handleConfirmation = function handleConfirmation (confirmed) {
      if (confirmed === undefined) {
        confirmed = false;
      }

      if (confirmed) {
        $scope.feedback = FEEDBACK.PENDING;
        $scope.feedback.message = 'Inserting ' + $scope.assertionImport.length + ' assertions from “' + $scope.importFile.name + '”';

        insertAssertions();

        $scope.importConfirmed = confirmed;
      } else {
        resetImport();
        $scope.feedback = FEEDBACK.PENDING;
        $scope.feedback.message = 'Import aborted. Choose another file or go back to the evaluation.';
      }
    };

    $scope.handleDoneClick = function handleDoneClick () {
      $rootScope.setEvalLocation();
    };
  });
