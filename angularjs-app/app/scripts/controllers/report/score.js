'use strict';

angular.module('wcagReporter')
  .controller('ReportScoreCtrl', function ($scope, wcag2spec, evalAuditModel) {
    $scope.principles = wcag2spec.getPrinciples();
    var totals = {
      'earl:passed': 0,
      'earl:failed': 0,
      'earl:inapplicable': 0,
      'earl:untested': 0,
      'earl:cantTell': 0,
      level_a: { pass: 0, total: 0 },
      level_aa: { pass: 0, total: 0 },
      level_aaa: { pass: 0, total: 0 }
    };
    $scope.totals = totals;

    $scope.getScores = function () {
      return wcag2spec.getPrinciples()
        .map(function (p) {
          var result = {
            name: p.num + '. ' + p.handle,
            'earl:passed': 0,
            'earl:failed': 0,
            'earl:inapplicable': 0,
            'earl:untested': 0,
            'earl:cantTell': 0,
            tested: 0,
            level_a: { pass: 0, total: 0 },
            level_aa: { pass: 0, total: 0 },
            level_aaa: { pass: 0, total: 0 }
          };

          // Get all criteria of this principle:
          p.guidelines.reduce(function (list, guide) {
            list.push.apply(list, guide.successcriteria);
            return list;
          }, [])
            .forEach(function (crit) {
              // For each, set the result
              var critResult = evalAuditModel.getCritAssert(crit.id);
              if (critResult) {
                var outcome = critResult.result.outcome;

                var level = crit.level
                  .replace('wai:WCAG2', '')
                  .replace('-Conformance', '')
                  .toLowerCase();

                result[outcome] += 1;
                $scope.totals[outcome] += 1;
                if (outcome === 'earl:passed' ||
                        outcome === 'earl:inapplicable') {
                  result['level_' + level].pass += 1;
                  totals['level_' + level].pass += 1;
                }
                if (outcome !== 'earl:untested') {
                  result.tested += 1;
                  result['level_' + level].total += 1;
                  totals['level_' + level].total += 1;
                }
              }
            });
          return result;
        });
    };

    $scope.scores = $scope.getScores();
    // Update the score name when the language changes
    $scope.$on('wcag2spec:langChange', function () {
      $scope.scores = $scope.getScores();
    });
  });
