'use strict'; 

angular.module('wcagReporter') 
.filter('nlToBr', function() {
    return function(text) {
        var txt =  text.split('\n').reduce(function (cur, line, i) {
            if (i === 0) {
                return line;
            } else {
                return cur + '<br />' + line;
            }
        });
        return txt;
    };
});