'use strict';

angular.module('wcagReporter')
  .service('appState', function ($rootScope, $document, translateFilter) {
    var appState;
    var warningTxt = translateFilter('COMMON.WARNING_BEFORE_UNLOAD');
    var jqWin = window.jQuery(window);

    appState = {
      pristine: true,
      empty: true,
      currentStateIndex: 0,
      maxStateIndex: 0,
      stateList: [
        {
          name: 'start',
          route: '/',
          copmlete: false
        },
        {
          name: 'scope',
          route: '/evaluation/scope',
          copmlete: false
        },
        {
          name: 'explore',
          route: '/evaluation/explore',
          copmlete: false
        },
        {
          name: 'sample',
          route: '/evaluation/sample',
          copmlete: false
        },
        {
          name: 'audit',
          route: '/evaluation/audit',
          copmlete: false
        },
        {
          name: 'report',
          route: '/evaluation/report',
          copmlete: false
        },
        {
          name: 'viewReport',
          route: '/view_report',
          copmlete: false
        }
      ]
    };

    function warningFn () {
      return warningTxt;
    }

    /**
     * Set the current state and if it's higher then the max state, increase the max
     * @param  {[string]} state name
     * @return {[object]} Self
     */
    appState.moveToState = function (newState) {
    	var i, newIndex;
    	for (i = 0; i < this.stateList.length; i += 1) {
        if (appState.stateList[i].name === newState) {
          newIndex = i;
          break;
        }
      }
    	appState.currentStateIndex = newIndex;
    	if (appState.maxStateIndex < newIndex) {
	  		appState.maxStateIndex = newIndex;
	  	}
    	return appState;
    };

    appState.getPreviousState = function () {
      return appState.stateList[appState.currentStateIndex - 1];
    };

    appState.getNextState = function () {
      return appState.stateList[appState.currentStateIndex + 1];
    };

    appState.setPrestineState = function () {
      appState.pristine = true;
      jqWin.off('beforeunload', warningFn);
      $document.one('change', 'input[type=text], textarea, select', appState.setDirtyState);
      $rootScope.$emit('appstate:prestine');
    };

    appState.setDirtyState = function setDirtyState () {
      if (appState.pristine) {
        $rootScope.$emit('appstate:dirty');
        jqWin.on('beforeunload', warningFn);
      }
      appState.pristine = false;
      appState.empty = false;
    };

    appState.init = function () {
      $document.one('change', 'input[type=text], textarea, select', appState.setDirtyState);
    };

    /**
     * Check if the browser supports all required features
     * @return {Boolean}
     */
    appState.hasBrowserSupport = function () {
      var res = true;
      if (!window.Blob) {
        console.error('Blob not supported in this browser.');
        res = false;
      }
      if (!window.FileReader) {
        console.error('FileReader not supported in this browser.');
        res = false;
      }
      if (!window.navigator.msSaveOrOpenBlob &&
            !((window.URL || window.webkitURL) &&
              (window.URL || window.webkitURL).createObjectURL)) {
        console.error('msSaveOrOpenBlob or createObjectURL not supported in this browser.');
        res = false;
      }
      return res;
    };

    return appState;
  });
