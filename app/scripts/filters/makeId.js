'use strict';
// Thanks to Alan Hogan https://github.com/angular/angular.js/issues/1703#issuecomment-18309081

angular.module('wcagReporter')
.filter('makeId', function () {
    return function(text) {
        return text.toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_]/g, '');
    };
});