'use strict';

angular
  .module('wcagReporter')
  .controller('ImportCtrl', function (
    fileReader,
    $scope,
    $rootScope,
    evalContextV2
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
          'result'
          // 'assertedBy'
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

      if (!hasRequiredKeys(assertion)) {
        return false;
      }

      return true;
    }

    function resetImport () {
      $scope.feedback = false;
      $scope.importFile = undefined;
      $scope.importConfirmed = undefined;
    }

    function handleLoad (defer, feedback) {
      defer.then(
        function success (result) {
          var resultJson = JSON.parse(result);

          JSONLD.frame(
            resultJson,
            {
              '@context': evalContextV2,
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
        $scope.importConfirmed = confirmed;
        $scope.feedback = FEEDBACK.SUCCESS;
      } else {
        resetImport();
      }
    };

    $scope.handleDoneClick = function handleDoneClick () {
      $rootScope.setEvalLocation();
    };
  });
