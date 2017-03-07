/**
 * @desc takes absolute path and returns relative path
 * @example let $scope.foo = 'absolute/path/to/bar' in the html file {{foo | cutPath}} will result in '/path/to/bar'
 */
(function(){
    'use strict';

    angular
        .module('starter')
        .filter('cutPath', cutPath);
    
    cutPath.$inject = ['$log'];
    function cutPath($log){
        return cutter;

        function cutter (input){
            if(input){
                var re = /(http[s]?:\/\/)?(localhost)?(\/api\/v\d\/.*\/)(data\/.*\.\w+)/;
                var cuts = input.match(re);
                try {
                    var relPath = cuts[cuts.length-1];
                } catch (error) {
                    $log.info('cutPath.filter.js: No match found. Setting result to original');
                    var relPath = input;
                }
                return relPath;
            } else return;
        }
    }
})();