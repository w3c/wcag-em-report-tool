'use strict';

angular.module('wcagReporter').service('evalReportModel', function() {
	this.creator   = undefined;
	this.title     = undefined;
	this.date      = Date.now();
	this.summary   = undefined;
	this.specifics = undefined;
	this.commissioner = undefined;
});