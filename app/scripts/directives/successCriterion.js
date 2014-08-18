'use strict';

angular.module('wcagReporter').directive(
		'successCriterion', function (directivePlugin, $rootScope) {
	var className;

    className = {
        'earl:untested': 'panel-default',
        'earl:passed': 'panel-success',
        'earl:failed': 'panel-danger',
        'earl:inapplicable': 'panel-info',
        'earl:cantTell': 'panel-warning'
    };

    return directivePlugin({
        restrict: 'E',
        replace: true,
        scope: {
        	    assert: '=assertion',
                spec: '=requirement',
         //    editable: '@',
                opt: '=options'
        },

        link: function (scope) {
            // scope.outcomes = outcomes;
            scope.rootHide = $rootScope.rootHide;
            scope.getClassName = function (state) {
                return className[state];
            };
       //  	scope.getUnique = function () {
    			// return uniqueNum += 1;
       //  	};

       //      scope.getCases = function () {
       //          if (!scope.opt.editable) {
       //              return scope.assert.hasPart
       //              .filter(function (assert) {
       //                  return assert.result.outcome !== 'earl:untested' ||
       //                         assert.result.description.trim() !== '';
       //             });
       //          }
       //          return scope.assert.hasPart;
       //      };

       //      scope.flipCollapse = function () {
       //          if (this.opt.showallpages) {
       //              if (!this.hasAllPages) {
       //                  this.assert.setCaseForEachPage();
       //                  this.hasAllPages = true;
       //              }
       //          }
       //          this.opt.collapsed = !this.opt.collapsed;
       //      };
        },
        templateUrl: 'views/directives/successCriterion.html'
    });
});