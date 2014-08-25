'use strict';

angular.module('wcagReporter', [
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngAnimate',
    'pascalprecht.translate',
    'ui.bootstrap'
]).config(function ($routeProvider, $compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|data|blob):/);

    $routeProvider.when('/', {
        templateUrl: 'views/start.html',
        controller: 'StartCtrl'
    }).when('/audit/scope', {
        templateUrl: 'views/audit/scope.html',
        controller: 'AuditScopeCtrl'
    }).when('/audit/explore', {
        templateUrl: 'views/audit/explore.html',
        controller: 'AuditExploreCtrl'
    }).when('/audit/sample', {
        templateUrl: 'views/audit/sample.html',
        controller: 'AuditSampleCtrl'
    }).when('/audit/test', {
        templateUrl: 'views/audit/test.html',
        controller: 'AuditTestCtrl'
    }).when('/report', {
        templateUrl: 'views/report.html',
        controller: 'ReportCtrl'
    }).when('/help', {
        templateUrl: 'views/help.html',
        controller: 'HelpCtrl'
    }).when('/import', {
        templateUrl: 'views/import.html',
        controller: 'ImportCtrl'
    }).when('/export', {
        templateUrl: 'views/export.html',
        controller: 'ExportCtrl'
    }).when('/audit/finalize', {
        templateUrl: 'views/audit/finalize.html',
        controller: 'AuditFinalizeCtrl'
    }).otherwise({
        redirectTo: '/'
    });

}).run(function (translateFilter, $rootScope, $document, appState, $location) {
    var titleElm = $document.find('title'),
        prefix = titleElm.text().trim();
    
    if (prefix) {
        prefix = titleElm.text() + ' - ';
    }

    $rootScope.translate = translateFilter;

    $rootScope.setTitle = function (title) {
        titleElm.text(prefix + title);
        return title;
    };

    $rootScope.rootHide = {};
    appState.init();

    $rootScope.setEvalLocation = function () {
        appState.setDirtyState();
        $location.path('/audit/scope');
    };

});