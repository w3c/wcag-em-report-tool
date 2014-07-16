'use strict';

angular.module('wcagReporter').directive('sample-page', function() {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        template: '<ul class="nav nav-tabs" ng-transclude></ul>'
    };

});