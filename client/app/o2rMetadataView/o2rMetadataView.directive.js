/**
 * Directive for displaying metadata of a single compendium.
 * Directive can only be used as an Html-Element and expects an attribute o2r-comp.
 * o2r-comp must be an object with at least the following attributes:
 * 
 * {
 * o2rComp: String, //id has to contain the id of the compendium
 * }
 * 
 * Example:
 * <o2r-metadata-view o2r-comp="{id: 'foo'}"></o2r-metadata-view>
 * 
 */
(function(){
    'use strict';

    angular
        .module('starter.o2rMetadataView')
        .directive('o2rMetadataView', o2rMetadataView);
    
    o2rMetadataView.$inject = ['$log', '$filter', 'jobs', 'icons'];
    function o2rMetadataView($log, $filter, jobs, icons){
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

            ////////

            function activate(value){
                scope.destroy = true;
                scope.destroy = false;
                comp = angular.fromJson(value);
                scope.o2r = comp.metadata.o2r;
                console.log(scope.o2r.description);
                scope.compId = comp.id;
                logger.info('received compendium with id:', scope.compId);
                var maplayer;
                if(angular.isDefined(scope.o2r.spatial) && angular.isDefined(scope.o2r.spatial.union)){
                    maplayer = {
                        "Geojson": {
                            name: 'Dataset',
                            type: 'geoJSONShape',
                            data: scope.o2r.spatial.union.geojson,
                            visible: true,
                            doRefresh: true
                        }
                    };
                } else {
                    maplayer = null;
                }
                scope.map = {
                    center: {
                        lat: 42.20133,
                        lng: 2.19110,
                        zoom: 2
                    },
                    layers: {
                        baselayers: {
                            xyz: {
                                name: 'OpenStreetMap',
                                url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                                type: 'xyz'
                            }
                        },
                        overlays: maplayer
                    }
                };
            }
		}
    }
})();