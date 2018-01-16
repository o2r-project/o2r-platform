/**
 * @desc takes absolute path and returns relative path including compendium id
 * @example let $scope.foo = 'absolute/path/to/bar' in the html file {{foo | cutPathLong}} will result in '/path/to/bar'
 */
(function(){
    'use strict';

    angular
        .module('starter')
        .filter('cutPathLong', cutPathLong);
    
    cutPathLong.$inject = ['$log'];
    function cutPathLong($log){
        return cutter;

        function cutter (input){
            if(input){
                var re = /(http[s]?:\/\/)?(localhost\/api\/v\d\/compendium\/)(.*\.\w+)/;
                var cuts = input.match(re);
                try {
                    var relPath = cuts[cuts.length-1];
                } catch (error) {
                    $log.info('cutPathLong.filter.js: No match found. Setting result to original');
                    var relPath = input;
                }
                
                
                return relPath;
            } else return;
        }
    }
})();