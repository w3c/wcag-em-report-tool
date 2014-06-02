(function (angular) {
    'use strict';

    angular.module('wcagReporter').service("appState", [function() {
        this.currentStateIndex = 0;
            this.stateList = [
                {name: 'start', path:'/', pass: false},
                {name: 'start', path:'/', pass: false},
                {name: 'start', path:'/', pass: false},
                {name: 'start', path:'/', pass: false}
            ]
    }]);

})(angular);