(function ($window) {
    'use strict';

    var $ = $window.jQuery;
    var loaded = [];

    // Load the language files for the application
    function loadLang(lang, callback) {
        // Pull from cache
        if (loaded.indexOf(lang) !== -1) {
            setTimeout(callback, 10);

        } else {
            // Else load the spec and locale file
            var specPath   = 'wcag20spec/js/wcag2.' + (lang.toLowerCase()) + '.js';
            var localePath = 'scripts/locale/' + (lang.toUpperCase()) + '.js';

            // We'll need to wait for both files to finish before
            // running the callback
            var done = 0;
            var isDone = function () {
                done+= 1;
                if (done === 2) {
                    loaded.push(lang);
                    console.log('TODO: move the locale from a .config to a .run');
                    console.log('TODO: Wait for angular to finish the new runs');
                    callback();
                }
            };

            $.getScript(localePath, isDone);
            $.getScript(specPath, isDone);

            // Timeout after 3 seconds
            setTimeout(function () {
                if (done !== 2) {
                    done = 3;
                    callback('Error loading locale scripts');
                }
            },3000);
        }
    }

    // Give the variable to 'window'
    $window.wcagReporterLoadLocale = loadLang;
    // Define the service for angular
    angular.module('wcagReporter')
    .service('localeLoader', function () {
        return {
            loadLang: loadLang
        };
    });

}(window));

