/**
 * @desc 
 */
(function(){
    'use strict';

    angular
        .module('starter')
        .directive('o2rMetadata', o2rMetadata);
    
    o2rMetadata.$inject = ['metadata'];
    function o2rMetadata(metadata){
        return {
            restrict: 'E',
            templateUrl: 'app/metadataPanel/metadata_panel.html'
        };
    }
})();