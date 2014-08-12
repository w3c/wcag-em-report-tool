'use strict';

angular.module('wcagReporter')
.controller('ReportScoreCtrl', function ($scope, wcag20spec, evalTestModel) {

    $scope.principles = wcag20spec.getPrinciples();

    $scope.scores = wcag20spec.getPrinciples().map(function (p) {
		evalTestModel;

		return {
			name: p.number + '. ' + p.title,
			passed: 0,
			failed: 0,
			notPresent: 0
		};
    });

});