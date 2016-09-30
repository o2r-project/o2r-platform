(function(){
    'use strict';

    angular
        .module('starter')
        .directive('o2rErcDownload', o2rErcDownload);

    function o2rErcDownload(){
        return{
            restrict: 'E',
            scope: {
                fileId: '=fileId'
            },
            templateUrl: 'app/ercView/ercDownload.template.html'
        };
    }
})();