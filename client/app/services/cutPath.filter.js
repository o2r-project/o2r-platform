/**
 * @desc takes absolute path and returns relative path
 * @example let $scope.foo = 'absolute/path/to/bar' in the html file {{foo | cutPath}} will result in '/path/to/bar'
 */
(function(){
    'use strict';

    angular
        .module('starter')
        .filter('cutPath', cutPath);
    
    function cutPath(){
        return cutter;

        function cutter (input){
            if(input){
                var cuts = input.split('/');
                var relPath = '';
                for (var i=6; i<cuts.length; i++){
                    if(i == 6){
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