/**
 * Directive for specifiying spatio-temporal properties.
 */

 (function(){
     'use strict';

    angular.module('starter.o2rSpacetime')
        .directive('o2rSpacetime', o2rSpacetime);
    o2rSpacetime.$inject = ['$log', 'creationObject', 'leafletDrawEvents', 'leafletData', '$interval'];
    function o2rSpacetime($log, creationObject, leafletDrawEvents, leafletData, $interval){
        return {
            restrict: 'E',      
            scope: true,
            templateUrl: 'app/o2rSpacetime/o2rSpacetime.template.html',
            controller: function($scope){
                var logger = $log.getInstance('SpaceTime');
                var drawnItems = new L.FeatureGroup();
                $scope.spacetime = creationObject.getSpacetime();
                $scope.updateTemporal = creationObject.updateTemporal;
                $scope.updateTemporalBegin = creationObject.updateTemporalBegin;
                $scope.updateTemporalEnd = creationObject.updateTemporalEnd;
                $scope.updateSpatialUnion = creationObject.updateSpatialUnion;
                
                createMap();

                $scope.$on('$stateChangeSuccess', function(){
                    $interval(function(){
                      leafletData.getMap().then(function(map){
                        map.invalidateSize();
                      });
                    }, 1, 1);
                  });
            
                function createMap(){
                    prepareTemporal();
                    var maplayer; 
    
                    if(angular.isDefined($scope.spacetime.spatial) 
                        && angular.isDefined($scope.spacetime.spatial.union) && ($scope.spacetime.spatial.union !== null) 
                        && angular.isDefined($scope.spacetime.spatial.union.geojson) && ($scope.spacetime.spatial.union.geojson !== null) 
                        && angular.isDefined($scope.spacetime.spatial.union.geojson.geometry) && ($scope.spacetime.spatial.union.geojson.geometry !== null)
                    ){
                        maplayer = {
                            "Geojson": {
                              name: 'Union',
                              type: 'geoJSONShape',
                              data: $scope.spacetime.spatial.union.geojson,
                              visible: true,
                              doRefresh: true,
                              layerOptions: {
                                onEachFeature: function(feature, layer){
                                  drawnItems.addLayer(layer);
                                }
                              }
                            }
                          };
                          logger.info('found existing spatial information');
                    } else {
                        logger.info('no existing spatial information found');
                        $scope.spacetime.spatial = {};
                        $scope.spacetime.spatial.union = {
                            "geojson": {
                                "type": "Feature",
                                "bbox": [
                                    -181.0,
                                    181.0,
                                    -181.0,
                                    181.0
                                ],
                                "geometry": {
                                    "type": "Polygon",
                                    "coordinates": [
                                        [
                                            [
                                            181.0,
                                            181.0
                                            ],
                                            [
                                            -181.0,
                                            181.0
                                            ],
                                            [
                                            -181.0,
                                            -181.0
                                            ],
                                            [
                                            181.0,
                                            -181.0
                                            ],
                                            [
                                            181.0,
                                            181.0
                                            ]
                                        ]
                                    ]
                                }
                            }
                        };
                        $scope.updateSpatialUnion($scope.spacetime.spatial.union);
                        maplayer = {
                            "Geojson": {
                                name: 'Union',
                                type: 'geoJSONShape',
                                data: $scope.spacetime.spatial.union.geojson,
                                visible: true,
                                doRefresh: true,
                                layerOptions: {
                                        onEachFeature: function(feature, layer){
                                        drawnItems.addLayer(layer);
                                    }
                                }
                            }
                        };
                    }
    
                    angular.extend($scope, {
                        center: {
                            lat: 42.20133,
                            lng: 5.19110,
                            zoom: 4
                        },
                        drawOptions: {
                            position: "bottomright",
                            draw: {
                                polygon: false,
                                rectangle: true,
                                polyline:false,
                                circle:false,
                                marker: false
                            },
                            edit: {
                                featureGroup: drawnItems,
                                remove: false
                            }
                        },
                        layers: {
                            baselayers: {
                                xyz: {
                                    name: 'OpenStreetMap (XYZ)',
                                    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                                    type: 'xyz'
                                    }
                                },
                            overlays: maplayer
                        }
                    });
    
                    leafletData.getMap().then(function(map){
                        var drawnItems = $scope.drawOptions.edit.featureGroup;
                        drawnItems.addTo(map);                   
                        map.on('draw:edited', function(e){
                            $scope.updateSpatialUnion(drawnItems.toGeoJSON().features[0]);
                        });
                    });
                }
    
                function prepareTemporal(){
                    if(angular.isUndefined($scope.spacetime.temporal.begin) || $scope.spacetime.temporal.begin == null){
                        $scope.spacetime.temporal.begin = new Date();
                        logger.info('setting new begin date');
                    } else {
                        $scope.spacetime.temporal.begin = new Date($scope.spacetime.temporal.begin);
                        logger.info('found existing begin date');
                    }
                    if(angular.isUndefined($scope.spacetime.temporal.end) || $scope.spacetime.temporal.end == null){
                        $scope.spacetime.temporal.end = new Date();
                        logger.info('setting new end date');
                    } else {
                        $scope.spacetime.temporal.end = new Date($scope.spacetime.temporal.end);
                        logger.info('found existing end date');
                    }
                    $scope.updateTemporal('begin', $scope.spacetime.temporal.begin);
                    $scope.updateTemporal('end', $scope.spacetime.temporal.end);
                }               

            },
            link: link
        };
        
        function link ($scope, element, attrs){
        }
    };
 })();