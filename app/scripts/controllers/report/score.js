'use strict';

angular.module('wcagReporter')
.controller('ReportScoreCtrl', function ($scope, wcag20spec, evalAuditModel) {

    $scope.principles = wcag20spec.getPrinciples();
    $scope.totals = {
        'earl:passed': 0,
        'earl:failed': 0,
        'earl:inapplicable': 0,
        'earl:untested': 0,
        'earl:cantTell': 0
    };

    $scope.scores = wcag20spec.getPrinciples().map(function (p) {
        var result = {
            name:  p.num + '. ' + p.title,
            'earl:passed': 0,
            'earl:failed': 0,
            'earl:inapplicable': 0,
            'earl:untested': 0,
            'earl:cantTell': 0
        };

        // Get all criteria of this principle:
        p.guidelines.reduce(function (list, guide) {
            list.push.apply(list, guide.criteria);
            return list;

        }, []).forEach(function (crit) {
        // For each, set the result
            var critResult = evalAuditModel.getCritAssert(crit.id);
            if (critResult) {
                result[critResult.result.outcome] += 1;
                $scope.totals[critResult.result.outcome] += 1;
            }
        });
        return result;
    });
});