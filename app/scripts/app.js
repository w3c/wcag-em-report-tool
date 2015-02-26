'use strict';

angular.module('wcagReporter', [
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngAnimate',
    'pascalprecht.translate',
    'ui.bootstrap',
    'wert-templates'
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
    }).when('/audit/finalize', {
        templateUrl: 'views/audit/finalize.html',
        controller: 'AuditFinalizeCtrl'
    }).when('/report', {
        templateUrl: 'views/report.html',
        controller: 'ReportCtrl'
    }).when('/import', {
        templateUrl: 'views/import.html',
        controller: 'ImportCtrl'
    }).when('/export', {
        templateUrl: 'views/export.html',
        controller: 'ExportCtrl'
    }).otherwise({
        redirectTo: '/'
    });


}).run(function (translateFilter, $rootScope, $document, appState, wcagReporterExport,
$location, $rootElement, evalScopeModel, showSave) {
    var titleElm = $document.find('title');
    var prefix = titleElm.text().trim();
    var moveFocusToH1;

    if (prefix) {
        prefix = titleElm.text() + ', ';
    }

    /*
    Few workaround to make screen readers behave.
    We move the focus to the h1, but since angular has no ready
    event for route loading we've moved this to a delayed call
    in the setTile method above.

    JAWS will always read the updated title. To have NVDA comply
    we'll blur when the route changes so SR's won't try to read
    all the changes to the DOM. Then once setTitle indicates the
    view is loaded, we'll wait another half second for it to compile
    and then move focus to the h1.
     */
    function focusH1() {
        var h1 = $rootElement.find('h1:first()').attr({
            'tabindex': -1,
            // This is a bug workaround for NVDA + IE, which
            // seems to think our <h1> is an input field
            'role': 'heading'
        });
        setTimeout(function () {
            h1.focus();
        }, 10);
    }

    $rootScope.setTitle = function (title) {
        var sitename = '';
        if (evalScopeModel.website && evalScopeModel.website.title) {
            sitename = evalScopeModel.website.title + ' - ';
        }

        titleElm.text(prefix + sitename + title);

        // Move focus to h1 when the title is set after the initial load
        if (moveFocusToH1) {
            moveFocusToH1 = false;
            // Wait for the template to compile, then focus to h1
            setTimeout(focusH1, 750);
        }

        return title;
    };


    $rootScope.translate = translateFilter;
    $rootScope.rootHide = {};

    appState.init();

    $rootScope.setEvalLocation = function () {
        appState.setDirtyState();
        $location.path('/audit/scope');
    };

    /*
    Set the next title change up to move the focus to h1
    This little workaround is to ensure
     */
    $rootScope.$on('$routeChangeSuccess', function () {
        // Move focus, starting at the second route change
        moveFocusToH1 = (moveFocusToH1 !== undefined);

        if (document.activeElement) {
            document.activeElement.blur();
        }
    });

    $rootScope.support = {
        hasSupport: appState.hasBrowserSupport(),
        hideMessage: false
    };

    if (showSave) {
        $rootElement.on('keydown', function (e) {
            // ctrl+s || cmd+s
            if (e.keyCode === 83 && (e.ctrlKey || e.metaKey)) {
                showSave(wcagReporterExport.getString(),
                         wcagReporterExport.getFileName(),
                         'application/json');

                appState.setPrestineState();
                e.preventDefault();
            }
        });
    }

// Setup automatic import/export based on attributes of the root element
}).run(function (wcagReporterImport, wcagReporterExport, $rootElement) {
    //var autosave = $rootElement.attr('autosave');
    wcagReporterExport.storage.init({
        //autosave: (autosave === '' || autosave.toLowerCase() === 'autosave'),
        url: $rootElement.attr('url'),
        saveDelay: ($rootElement.attr('save-delay') || 1500)
    });

    if ($rootElement.attr('url')) {
        wcagReporterImport.getFromUrl();
    }
});

