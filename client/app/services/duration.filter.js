/**
 * Filter for humanizing durations
 * Filter uses moment.js function moment.duration().humanize()
 */
(function(){
    'use strict';
    
    angular
        .module('starter')
        .filter('duration', duration);
    
    duration.$inject = [];
    function duration(){
        return function(input){
            return moment.duration(input).humanize();
        }
    }
})();