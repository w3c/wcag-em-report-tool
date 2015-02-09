'use strict';
angular.module('wcagReporter')
.directive('infoButton', function(directivePlugin) {
    return directivePlugin({
        restrict: 'E',
        scope: {
            label: '@',
            target: '@'
        },
        link: function (scope, elm) {
            var tgt;
            elm.on('click', function () {
                if (!tgt) {
                    if (typeof scope.target === 'undefined') {
                        tgt = elm.next();
                    } else {
                        tgt = angular.element('#' + scope.target);
                    }
                }
                tgt.toggle(200, function () {
                    tgt.focus();
                });
            });
        },
        replace: true,
        template: '<a class="info-icon" href="">' +
            '<span class="glyphicon glyphicon-info-sign"></span>' +
            '<span class="sr-only">{{label}}</span></a> '
    });
});