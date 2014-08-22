'use strict';

angular.module('wcagReporter')
.service('reportStorage', function ($http, wcagReporterExport) {

	var reportStorage = {
		settings: {
			url: '',
			revisionId: undefined,
			autosave: false
		},
		post: function () {
			var json = wcagReporterExport.getJson();
			if (reportStorage.settings.revisionId) {
				json._rev = reportStorage.settings.revisionId;
			}
			var promise = $http.put(reportStorage.settings.url, json, {}, {
				withCredentials: true,
			});

			promise.success(function (data) {
				if (data.rev) {
					reportStorage.settings.revisionId = data.rev;
					console.log(reportStorage.settings.revisionId);
				}
			});

			return promise;
		}
	};

	return reportStorage;
});
