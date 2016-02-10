'use strict';

angular.module('sistem3.osb-pocket-poke', ['osb-pocket-poke-template'])
    .directive('osbPocketPoke', ['$http', '$q', function ($http, $q) {
        return {
            templateUrl: 'osbPocketPoke.tpl.html',
            restrict: 'EA',
            link: function ($scope, element, attrs) {
                console.log('Lets get things started');
            }
        };
    }]);