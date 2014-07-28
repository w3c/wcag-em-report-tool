'use strict';
angular.module('wcagReporter')
	.directive('assertResult', function(directivePlugin) {

	var outcomes = [
        {id: 'earl:untested', name: 'Untested'},
        {id: 'earl:passed', name: 'Passed'},
        {id: 'earl:failed', name: 'Failed'},
        {id: 'earl:cantTell', name: 'Cannot tell'},
        {id: 'earl:inapplicable', name: 'Inapplicable'},
    ];

    return directivePlugin({
        restrict: 'E',
        scope: {
            assert: '=',
            opt: '=options'
        },
        link: function (scope) {
            scope.outcomes = outcomes;
        },
        templateUrl: 'views/audit/test/assertResult.drt.html'
    });
});