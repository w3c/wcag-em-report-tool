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


}).directive('infoField', function(directivePlugin, $document) {

    /**
     * Get the next visible element that can receive focus outside the .alert-info
     */
    function getNextFocusElement(elm) {
        var selector = ':input:visible, a[href]:visible',
            focusable = $document.find(selector);

        elm = angular.element(elm)
        .closest('.alert-info')
        .find(selector).last();

        return focusable[focusable.index(elm)+1];
    }

    return directivePlugin({
        restrict: 'E',
        scope: {
            'ref': '@',
            'button': '@',
            'exitto': '@'
        },
        link: function (scope, elm) {
            elm.hide(0);
            scope.close = function ($event) {
                var nextElm = angular.element('#' + scope.exitto);
                if ($event.type === 'keyup' &&
                ($event.keyCode !== 13 && $event.keyCode !== 27)) {
                    return;
                }
                if (!nextElm) {
                    nextElm = getNextFocusElement($event.target);
                }
                nextElm.focus();
                elm.hide(200);
            };
        },
        replace: true,
        transclude: true,
        templateUrl: 'views/directives/evaluate/infoField.html'
    });
});