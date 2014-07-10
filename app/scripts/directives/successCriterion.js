'use strict';

angular.module('wcagReporter').directive('scAudit', function (directivePlugin) {
    return directivePlugin({
        restrict: 'E',
        transclude: true,
        replace: true,
        link: function () {
        	console.log(4321);
        },
        templateUrl: 'views/scAudit.drt.html'
    });

}).directive('scResult', function(directivePlugin) {
    return directivePlugin({
        restrict: 'E',
        transclude: true,
        replace: true,
        link: function () {
        	console.log(1234);
        },
        templateUrl: 'views/scResult.drt.html'
    });
});

angular.module('wcagReporter').config(function($provide) {
	console.log($provide.provider);
    $provide.decorator('scAuditDirective', function($delegate) {
        var directive = $delegate[0];
        directive.plugins.push({
        	link: function () {
        		console.log('linked plugin');
        	}
        });
        return $delegate;
   });
});
