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


}).directive('infoField', function(directivePlugin) {
    return directivePlugin({
        restrict: 'E',
        scope: {
            'ref': '@',
            'button': '@',
            'exitto': '@'
        },
        link: function (scope, elm) {
            elm.hide(0);

            function hide (e) {
                // The div doesn't get a 'click' so 
                // we check for a return keyup
                if (e.type === 'keyup' &&
                (e.keyCode !== 13 && e.keyCode !== 27)) {
                    return;
                }
                elm.hide(200, function () {
                    angular.element('#' + scope.exitto).focus();
                });
            }
            elm.on('keyup', hide)
            .find('button').on('click', hide);
        },
        replace: true,
        transclude: true,
        templateUrl: 'views/audit/infoField.drt.html'
    });
});