/**
 * @desc takes a string and returns same string with the first letter in uppercase
 * @example let $scope.foo = 'bar' in the html file {{foo | upperCase}} will result in 'Bar'
 */
(function(){
    'use strict';

    angular
        .module('starter')
        .filter('upperCase', upperCase);
    
    function upperCase(){
        return caps;

        function caps (input){
            return input.charAt(0).toUpperCase() + input.slice(1);
        }
    }
})();