'use strict';

angular.module('wcagReporter').service('evalExploreModel', function() {

	this.reliedUponTechnology = [];
	this.commonPages = undefined;
	this.essentialFunctionality = undefined;
	this.pageTypeVariety = undefined;
	this.otherRelevantPages = undefined;

	this.validate = function () {
    	return [];
    };

    Object.preventExtensions(this);
});