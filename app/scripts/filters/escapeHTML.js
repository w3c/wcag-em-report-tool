'use strict'; 
// Thanks to Alan Hogan https://github.com/angular/angular.js/issues/1703#issuecomment-18309081

angular.module('wcagReporter') 
.filter('escapeHTML', function () {

    return function(text) {
      if (text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/'/g, '&#39;')
            .replace(/"/g, '&quot;');
      }
      return '';
    };
});