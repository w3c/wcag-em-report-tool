'use strict';

/**
 * Allow developers to create plugins for a directive
 *
 * Fow now, only additional link functions are supported
 */
angular.module('wcagReporter')
  .factory('directivePlugin', function () {
    var func = function (directive) {
      var link = directive.link || function () {};

    	if (!directive.plugins) {
    		directive.plugins = [];
    	}

      directive.link = function () {
        	var args = arguments;
        	link.apply(undefined, args);

        	directive.plugins.forEach(function (plugin) {
        		if (plugin.link) {
        			plugin.link.apply(undefined, args);
        		}
        	});
      };

    	return directive;
    };
    return func;
  });
