'use strict';
angular.module('wcagReporter')
  .filter('getUrl', function () {
    var linkReg = /((https?):\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\-\w\d@:%_\+.~#?,&\/\/=]+)/g;

    return function (text) {
    	var match;
    	if (typeof text === 'string') {
        	match = text.match(linkReg);
    	}
      if (match) {
        return match[0];
      } else {
        	return false;
      }
    };
  });
