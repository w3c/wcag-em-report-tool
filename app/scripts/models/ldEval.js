'use strict';

/**
 * 
 */
angular.module('wcagReporter')
.factory('ldEval', function (evalContextV2, evalModel, ldModel) {
	var model;

	ldEval = ldModel({
		type: 'Evaluation'
		id: '_:report_' + Date.now(),
		scope: {
			type: 'EvaluationScope'
		},

	}, evalContextV2, function (err, res) {
		model = res;
	});

	return function () {
		return model;
	}
});