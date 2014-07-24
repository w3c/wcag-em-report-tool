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
            editable: '@'
        },
        link: function (scope, elm, attr) {
            if (attr.editable === 'false') {
                scope.editable = false;
            } else if (typeof attr.editable !== 'undefined') {
                scope.editable = !!attr.editable;
            } else {
                scope.editable = false;
            }
            scope.outcomes = outcomes;
        },
        templateUrl: 'views/audit/test/assertResult.drt.html'
    });
});