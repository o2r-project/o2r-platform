/**
 * Directive for displaying metadata of a single compendium.
 */
(function(){
    'use strict';

    angular
        .module('starter.o2rMetadataView')
        .directive('o2rMetadataView', o2rMetadataView);
    
    o2rMetadataView.$inject = ['$log', 'icons'];
    function o2rMetadataView($log, icons){
        return {
            restrict: 'E',
            scope: {
                o2rComp: '@'
            },
            templateUrl: 'app/o2rMetadataView/o2rMetadataView.template.html',
            link: link
        };

        function link(scope, iElement, attrs){
            var logger = $log.getInstance('o2rMetadata');
            var comp;

            scope.icons = icons;
            scope.isUndefined = (o) => angular.isUndefined(o);
            scope.notNull = (val) => val !== null;
            
            attrs.$observe('o2rComp', function(value){
                if(value == ''){}
                else activate(value);
            });

            function activate(value){
                scope.destroy = true;
                scope.destroy = false;
                comp = angular.fromJson(value);
                scope.o2r = comp.metadata.o2r;
                scope.compId = comp.id;
                logger.info('received compendium with id:', scope.compId);
            }
		}
    }
})();