'use strict';

angular.module('wcagReporter')
  .filter('selectedCasesOnly', function () {
    function critHasSelectedPages (criterion) {
      for (var i = 0; i < criterion.subject.length; i++) {
        var page = criterion.subject[i];
        if (page.selected && (page.title || page.description)) {
          return true;
        }
      }
      return false;
    }

    return function (criterion) {
      if (criterion) {
        return criterion.filter(critHasSelectedPages);
      }
    };
  });
