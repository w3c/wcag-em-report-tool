'use strict';

angular.module('wcagReporter')
.service('localeLoader', function ($window) {
    var $ = $window.jQuery;
    var loaded = [];

    function loadLang(lang, callback) {
        if (loaded.indexOf(lang) !== -1) {
            setTimeout(callback, 10);

        } else {
            var specPath   = 'wcag20spec/js/wcag2.' + (lang.toLowerCase()) + '.js';
            var localePath = 'scripts/locale/' + (lang.toUpperCase()) + '.js';

            var done = 0;
            var isDone = function () {
                done+= 1;
                if (done === 2) {
                    loaded.push(lang);
                    callback();
                }
            };

            $.getScript(localePath, isDone);
            $.getScript(specPath, isDone);
            setTimeout(function () {
                if (done !== 2) {
                    done = 3;
                    callback('Error loading locale scripts');
                }
            },3000);
        }
    }

    return {
        loadLang: loadLang
    };

});