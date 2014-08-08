'use strict';

(function ($, ng) {
    $('body').on('drop', '', function () {

    });

    ng.module('wcagReporter')
    .controller('ImportCtrl', function ($scope, 
            $location, wcagReporterImport) {
        var reader;
        try {
            reader = new FileReader();
            reader.addEventListener('load', function(event) {
                var textFile = event.target;
                wcagReporterImport.fromJson(textFile.result);
            });

        } catch (e) {
            $scope.showError = 'ERR_NO_SUPPORT';
        }

        $scope.showError = false;
        $scope.loadFile = function () {
            var file = $('#load_json')[0].files[0];
            if (!file) {
                $scope.showError = 'ERR_NO_FILE';
                return;
            } else if (reader) {
                $scope.showError = false;
                reader.readAsText(file);
                $location.path('#/audit/finalize');
            }
        };
    });


}(window.jQuery, angular));