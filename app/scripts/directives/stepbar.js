'use strict';

angular.module('wcagReporter').directive('wreStepbar', function() {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        template: '<ul class="wizard" ng-transclude></ul>'
    };

}).directive('wreStep', function() {
    return {
        restrict: 'E',
        scope: {
            step: '=',
            active: '&'
        },
        transclude: true,
        replace: true,
        link: function (scope) {
            if (!scope.active()) {
                scope.route = scope.step.route;
            }
        },
        template: 
            '<li ng-class="{active:active()}" class="wizard-step">' +
            '<a ng-href="{{route}}">'+
            '<span ng-transclude></span></a>' +
            '</li>'
    };
});
