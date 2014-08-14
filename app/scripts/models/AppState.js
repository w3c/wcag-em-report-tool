'use strict';

angular.module('wcagReporter')
.service('appState', function ($rootScope, $document, translateFilter) {
    var appState,
        warningTxt = translateFilter('WARNING_BEFORE_UNLOAD'),
        jqWin = window.jQuery(window);
    
    appState = {
        pristine: true,
        empty: true,
        currentStateIndex: 0,
        maxStateIndex: 0,
        stateList: [
            {name: 'start',     route:'#/',   copmlete: false},
            {name: 'scope',     route:'#/audit/scope',   copmlete: false},
            {name: 'explore',   route:'#/audit/explore', copmlete: false},
            {name: 'sample',    route:'#/audit/sample',  copmlete: false},
            {name: 'test',      route:'#/audit/test',    copmlete: false},
            {name: 'finalize',  route:'#/audit/finalize',    copmlete: false},
            {name: 'save',      route:'#/report',    copmlete: false}
        ]
    };

    function warningFn (){
        return warningTxt;
    }

    /**
     * Set the current state and if it's higher then the max state, increase the max
     * @param  {[string]} state name
     * @return {[object]} Self
     */
    appState.moveToState = function (newState) {
    	var i, newIndex;
    	for (i = 0; i < this.stateList.length; i+=1) {
			
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

    appState.setPrestineState = function () {
        appState.pristine = true;
        jqWin.off('beforeunload', warningFn);
    };

    appState.setDirtyState = function setDirtyState() {
        appState.pristine = false;
        appState.empty = false;
        if (appState.pristine && appState.empty) {
            jqWin.on('beforeunload', warningFn);
        }
    };

    appState.init = function () {
        $document.one('change', 'input[type=text], textarea, select', appState.setDirtyState);
    };

    return appState;
});