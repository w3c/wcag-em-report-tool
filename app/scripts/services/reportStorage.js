'use strict';

angular.module('wcagReporter')
.service('reportStorage', function ($http) {


	var reportStorage = {
		settings: {
			url: '',
			revisionId: undefined,
			autosave: false
		},
		post: function (json) {
			return $http.put(reportStorage.settings.url, json, {}, {
				withCredentials: true,
			});
		}
	};

	return reportStorage;
});
