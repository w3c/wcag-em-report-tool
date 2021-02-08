'use strict';

angular.module('wcagReporter')
  .run(function ($rootScope, $document, $rootElement, evalScopeModel) {
    var titleElm = $document.find('title');
    var prefix = titleElm.text()
      .trim();
    var routeChanged;

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
    $rootScope.focusH1 = function focusH1 () {
      var h1 = $rootElement.find('h1:first()')
        .attr({
          tabindex: -1,
          // This is a bug workaround for NVDA + IE, which
          // seems to think our <h1> is an input field
          role: 'heading'
        });
      setTimeout(function () {
        h1.focus();
      }, 10);
    };

    $rootScope.setTitle = function (title) {
      var sitename = '';
      if (evalScopeModel.website && evalScopeModel.website.title) {
        sitename = evalScopeModel.website.title + ' - ';
      }

      titleElm.text(prefix + sitename + title);

      // Move focus to h1 when the title is set after the initial load
      if (routeChanged === true) {
        routeChanged = false;
        // Wait for the template to compile, then focus to h1
        setTimeout($rootScope.focusH1, 750);
      }
      return title;
    };

    /*
    Set the next title change up to move the focus to h1
    This little workaround is to ensure
     */
    $rootScope.$on('$routeChangeSuccess', function () {
      // Move focus, starting at the second route change
      routeChanged = (routeChanged !== undefined);

      if (document.activeElement) {
        document.activeElement.blur();
      }
    });

    // Setup root scope
  })
  .run(function ($rootScope, appState, $location) {
    $rootScope.rootHide = {};

    appState.init();

    $rootScope.setEvalLocation = function () {
      appState.setDirtyState();
      $location.path('/evaluation/scope');
    };
    $rootScope.support = {
      hasSupport: appState.hasBrowserSupport(),
      hideMessage: false
    };

    // ctrl+s || cmd+s
  })
  .run(function ($rootElement, wcagReporterExport, showSave, appState) {
    if (showSave) {
      $rootElement.on('keydown', function (e) {
        if (e.keyCode === 83 && (e.ctrlKey || e.metaKey)) {
          showSave(
            wcagReporterExport.getString(),
            wcagReporterExport.getFileName(),
            'application/json'
          );

          appState.setPrestineState();
          e.preventDefault();
        }
      });
    }

    // Ensure all external links open in a new window
    var reg = new RegExp('/' + window.location.host + '/');
    $rootElement.on('click', 'a[href]:not(.local)', function (e) {
      if (!reg.test(this.href) && this.href.substr(0, 4) === 'http') {
        e.preventDefault();
        e.stopPropagation();
        window.open(this.href, '_blank');
      }
    });

    // Setup automatic import/export based on attributes of the root element
  })
  .run(function (wcagReporterImport, wcagReporterExport, $rootElement) {
    wcagReporterExport.storage.init({
      autosave: (typeof $rootElement.attr('autosave') === 'string'),
      url: $rootElement.attr('url'),
      saveDelay: ($rootElement.attr('save-delay') || 1500)
    });

    if ($rootElement.attr('url')) {
      wcagReporterImport.getFromUrl();
    }
  });
