'use strict';

angular.module('wcagReporter')
  .directive('techSelect', function () {
    var knownTechnologies = [
      { title: 'HTML5', specs: 'http://www.w3.org/TR/html5/' },
      { title: 'CSS', specs: 'http://www.w3.org/Style/CSS/specs/' },
      { title: 'HTML 4.01', specs: 'http://www.w3.org/TR/html401/' }
    ];

    function updateTech (reliedUponTech, prop1, prop2) {
      knownTechnologies.forEach(function (tech) {
        if (reliedUponTech[prop1] === tech[prop1]) {
          reliedUponTech[prop2] = tech[prop2];
        }
      });
    }

    return {
      restrict: 'E',
      replace: true,
      scope: { selected: '=' },
      link: function (scope) {
        	scope.technolgies = knownTechnologies;
        	scope.updateTitle = function (select) {
        		updateTech(select, 'specs', 'title');
        	};
        	scope.updateSpec = function (select) {
        		updateTech(select, 'title', 'specs');
        	};
      },
      templateUrl: 'views/directives/evaluate/techSelect.html'
    };
  });
