(function(){
    'use strict';

    angular
        .module('starter')
        .filter('replaceUnderscore', replaceUnderscore);
    
    replaceUnderscore.$inject = [];
    function replaceUnderscore(){
        return function(input){
            return input.replace(/_/g, ' ');
        }
    }
})();