'use strict';


/**
 *
 */
angular.module('wcagReporter')
.provider('wcag20spec', function() {
    var specPath;
    var guidelines;
    var criteria;
    var currentSpec;
    var broadcast = angular.noop;
    var criteriaObj = {};
    var specs = {};

    function pluck(prop) {
        return function (a, b) {
            if (!angular.isArray(a)) {
                a = a[prop];
            }
            return a.concat(b[prop]);
        };
    }


    var wcag2 = {
        addSpec: function (lang, spec) {
            lang = lang.toLowerCase();
            specs[lang] = spec;
            if (!currentSpec) {
                wcag2.useLanguage(lang);
            }
        },

        loadLanguage: function (lang) {
            lang = lang.toLowerCase();
            if (typeof specPath !== 'string') {
                throw new Error('specPath must be defined first');
            }
            if (specs[lang]) {
                return wcag2.useLanguage(lang);
            }

            var path = specPath.replace('${lang}', lang.toLowerCase());
            $.getJSON(path)
            .done(function (data) {
                specs[lang] = data;
                wcag2.useLanguage(lang);
                broadcast('wcag20spec:load', lang);
            }).fail(console.error.bind(console));
        },

        useLanguage: function (lang) {
            lang = lang.toLowerCase();
            if (!specs[lang]) {
                throw new Error('Spec for lang ' + lang + ' not defined.');
            }
            currentSpec = specs[lang];
            // Concat all guidelines arrays of each principle
            guidelines = currentSpec.principles
            .reduce(pluck('guidelines'), []);

            // Concat all criteria arrays of each guideline
            criteria = guidelines.reduce(pluck('successcriteria'), []);

            // Make an object of the criteria array with uri as keys
            criteria.forEach(function (criterion) {
                if (['A', 'AA', 'AAA'].indexOf(criterion.level) !== -1) {
                    criterion.id = criterion.id.replace('WCAG2:', 'wcag20:');
                    criterion.level = 'wai:WCAG2' + criterion.level + '-Conformance';
                    criteriaObj[criterion.id] = criterion;
                }
            });
            
            broadcast('wcag20spec:langChange', lang);
        },

        getGuidelines: function () {
            return guidelines;
        },
        getCriteria: function () {
            return criteria;
        },
        getCriterion: function (id) {
            return criteriaObj[id];
        },
        getPrinciples: function () {
            return currentSpec.principles;
        }
    };


    this.setSpecPath  = function (path) {
        specPath = path;
    };

    this.loadLanguage = wcag2.loadLanguage;

    this.$get = ['$rootScope', function ($rootScope) {
        broadcast = function (a,b,c) {
            $rootScope.$broadcast(a,b,c);
        };
        return angular.extend({}, wcag2);
    }];


});
