'use strict'; 

angular.module('wcagReporter') 
.filter('selectedCasesOnly', function(evalSampleModel) {

    function critHasSelectedPages(criterion) {
        for (var i = 0; i < criterion.subject.length; i++) {
            if (criterion.subject[i].selected) {
                return true;
            }
        }
        return false;
    }

    return function(criterion) {
        var anySelected = false;
        evalSampleModel.getPages().forEach(function (page) {
            if (anySelected || page.selected) {
                anySelected = true;
            }
        });

        if (anySelected) {
            return criterion.filter(critHasSelectedPages);
        } else {
            return criterion;
        }
    };
});