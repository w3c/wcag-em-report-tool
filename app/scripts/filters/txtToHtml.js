'use strict'; 

angular.module('wcagReporter') 
.filter('txtToHtml', function($filter) {

    return function(text) {
        if (typeof text !== 'string') {
            return '';
        }

        return  text.split('\n').reduce(function (cur, line, i) {
            if (line.trim() === '') {
                return cur + '</p><p>';
            } else {
                line = $filter('linky')(line, '_blank');
                return cur + (i === 0 ? '' : '<br />') + line;
            }
        }, '<p>') + '</p>';
    };

});