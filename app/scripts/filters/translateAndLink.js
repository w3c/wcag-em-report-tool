'use strict'; 
// Thanks to Alan Hogan https://github.com/angular/angular.js/issues/1703#issuecomment-18309081

angular.module('wcagReporter') 
.filter('translateAndLink', function ($filter) {
    var translate = $filter('translate'),
        format    = $filter('format');

    return function (str) {
        var args = Array.prototype.slice.call(arguments, 1);
        
        args = args.map(function (link) {
            var target = (link[1].substr(0, 4) === 'http' ? '" target="_blanc">' : '">');
            return '<a href="' + link[1] + target  +  translate(link[0]) +  '</a>';
        });
        
        args.unshift(translate(str));
        
        //console.log(args);
        return format.apply(null, args);
    };
});