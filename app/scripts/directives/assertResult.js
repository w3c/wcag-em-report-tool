'use strict';
angular.module('wcagReporter')
	.directive('assertResult', function(directivePlugin) {

	var outcomes = [
        {id: 'earl:untested', name: 'Untested'},
        {id: 'earl:pass', name: 'Pass'},
        {id: 'earl:fail', name: 'Fail'},
        {id: 'earl:cantTell', name: 'Can\'t tell'},
        {id: 'earl:inapplicable', name: 'inapplicable'},
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