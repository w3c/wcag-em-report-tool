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
        template: '<a href="">' +
            '<span class="glyphicon glyphicon-info-sign"></span>' +
            '<span class="sr-only">{{label}}</span></a>'
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

            elm.find('button').andSelf()
            .on('click keyup', function (e) {
                // The div doesn't get a 'click' so 
                // we check for a return keyup
                if (e.type === 'keyup' && e.keyCode !== 13) {
                    return;
                }
                elm.hide(200, function () {
                    angular.element('#' + scope.exitto).focus();
                });
            });
        },
        replace: true,
        transclude: true,
        templateUrl: 'views/audit/infoField.drt.html'
    });
});