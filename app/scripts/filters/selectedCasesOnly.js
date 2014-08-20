'use strict'; 

angular.module('wcagReporter')
.filter('selectedCasesOnly', function() {

    function critHasSelectedPages(criterion) {
        if (criterion.subject.length === 0) {
            return true;
        }
        for (var i = 0; i < criterion.subject.length; i++) {
            if (criterion.subject[i].selected) {
                return true;
            }
        }
        return false;
    }

    return function(criterion) {
        if (criterion) {
            return criterion.filter(critHasSelectedPages);
        }
    };
});