// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function (config) {
  'use strict';
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    client: {
      jasmine: {
        random: false
      }
    },
    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'app/bower_components/jquery/dist/jquery.js',
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-animate/angular-animate.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-sanitize/angular-sanitize.js',
      'app/bower_components/angular-translate/angular-translate.js',
      'app/bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
      'app/bower_components/json3/lib/json3.js',
      'app/bower_components/textarea-autosize/dist/jquery.textarea_autosize.js',
      'app/scripts/libs/promise-1.0.0.js',
      'app/scripts/libs/jsonld.js',
      'app/scripts/**/{,*/}*.js',
      'app/scripts/app.language.js',
      'app/scripts/app.run.js',
      'app/scripts/app.js',
      {
        pattern: '.tmp/locale/*.json',
        included: false,
        served: true
      },
      {
        pattern: 'app/wcag2spec/*.json',
        included: false,
        served: true
      },
      'test/setup.js',
      'test/dummyData/*.js',
      'test/spec/**/{,*/}*.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    proxies: {
      '/wcag2spec/': 'http://localhost:8080/base/app/wcag2spec/',
      '/locale/': 'http://localhost:8080/base/.tmp/locale/'
    },

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
