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
        scope: {},
        transclude: true,
        replace: true,
        link: function (scope, elm, attr) {
            scope.status = [];
            if (attr.active === 'true') {
                scope.status.push('active');
            }
            if (attr.disabled === 'false') {
                scope.status.push('disabled');
                scope.disabled = true;
            } else {
                elm.find('a').attr('href', attr.href);
            }
            if (attr.complete) {
              scope.glyphOk = 'glyphicon-ok';
            }
        },
        template:   '<li ng-class="{{status}}" class="wizard-step">  <a>' +
                        '<span class="glyphicon {{glyphOk}}"></span> ' +
                        '<span ng-transclude></span>' +
                    '</a>  </li>'
    };
});
