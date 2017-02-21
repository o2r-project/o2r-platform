/**
 * @desc takes absolute path and returns relative path including compendium id
 * @example let $scope.foo = 'absolute/path/to/bar' in the html file {{foo | cutPathLong}} will result in '/path/to/bar'
 */
(function(){
    'use strict';

    angular
        .module('starter')
        .filter('cutPathLong', cutPathLong);
    
    function cutPathLong(){
        return cutter;

        function cutter (input){
            if(input){
                var cuts = input.split('/');
                var relPath = '';
                for (var i=4; i<cuts.length; i++){
                    if(i == 4){
                        relPath += cuts[i];
                    } else {
                        relPath += '/' + cuts[i];
                    }
                }
                return relPath;
            } else return;
        }
    }
})();