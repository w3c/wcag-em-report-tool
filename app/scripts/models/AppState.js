'use strict';

angular.module('wcagReporter').service('appState', function() {
    this.currentStateIndex = 0;
    this.maxStateIndex = 0;
    this.stateList = [
        {name: 'scope',   route:'#/audit/scope',   copmlete: false},
        {name: 'explore', route:'#/audit/explore', copmlete: false},
        {name: 'sample',  route:'#/audit/sample',  copmlete: false},
        {name: 'test',    route:'#/audit/test',    copmlete: false},
        {name: 'finalize',    route:'#/audit/finalize',    copmlete: false}
    ];

    /**
     * Set the current state and if it's higher then the max state, increase the max
     * @param  {[string]} state name
     * @return {[object]} Self
     */
    this.moveToState = function (newState) {
    	var i, newIndex;
    	for (i = 0; i < this.stateList.length; i+=1) {
			
			if (this.stateList[i].name === newState) {
				newIndex = i;
				break;
			}
		}
    	this.currentStateIndex = newIndex;
    	if (this.maxStateIndex < newIndex) {
	  		this.maxStateIndex = newIndex;
	  	}
    	return this;
    };
});