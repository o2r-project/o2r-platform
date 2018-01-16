(function(){
    'use strict';

    angular
        .module('starter')
        .controller('SpaceTimeController', SpaceTimeController);
    
    SpaceTimeController.$inject = ['$log', '$scope', '$interval', 'leafletDrawEvents', 'leafletData', 'creationObject'];

    function SpaceTimeController($log, $scope, $interval, leafletDrawEvents, leafletData, creationObject){
      var logger = $log.getInstance('SpaceTime');

      var drawnItems = new L.FeatureGroup();
    
      var vm = this;
      vm.spacetime = creationObject.getSpacetime();
      vm.updateTemporal = creationObject.updateTemporal;
      
      vm.updateTemporalBegin = creationObject.updateTemporalBegin;
      vm.updateTemporalEnd = creationObject.updateTemporalEnd;
      vm.updateSpatialUnion = creationObject.updateSpatialUnion;

      $scope.$on('$destroy', function(){
          // logger.info(angular.toJson(creationObject.getSpacetime()));
      });

      activate();

      // TODO
      //Just a bad workaround for loading all tiles of the map
      //As soon as there is a better solution, rewrite this code
      $scope.$on('$stateChangeSuccess', function(){
        $interval(function(){
          leafletData.getMap().then(function(map){
            map.invalidateSize();
          });
        }, 1, 1);
      });
      ////////

      function activate(){
        prepareTemporal();
        
        
        var maplayer;
        // check if spatial and spatial.union are defined
        // if true, use their values to create maplayer
        if(angular.isDefined(vm.spacetime.spatial) && angular.isDefined(vm.spacetime.spatial.union) && (vm.spacetime.spatial.union !== null)){
          maplayer = {
            "Geojson": {
              name: 'Union',
              type: 'geoJSONShape',
              data: vm.spacetime.spatial.union.geojson,
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

          // if spatial.union is empty object, create a new empty layer
          // if(!angular.equals(vm.spacetime.spatial.union, {})){
            // L.geoJson(vm.spacetime.spatial.union.features[0], {
            //   onEachFeature: function(feature, layer){
            //     drawnItems.addLayer(layer);
            //   }
            // });
          // }
        } else {
          logger.info('no existing spatial information found');
          vm.spacetime.spatial = {};
          vm.spacetime.spatial.union = {
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
          vm.updateSpatialUnion(vm.spacetime.spatial.union);
          maplayer = {
            "Geojson": {
              name: 'Union',
              type: 'geoJSONShape',
              data: vm.spacetime.spatial.union.geojson,
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


        angular.extend(vm, {
          map: {
            center: {
              lat: 42.20133,
              lng: 2.19110,
              zoom: 2
            },
            drawOptions: {
              position: "bottomright",
              draw: {
                // polygon: {
                //   metric: false,
                //   showArea: true,
                //   drawError: {
                //     color: '#b00b00',
                //     timeout: 1000
                //   },
                //   shapeOptions: {
                //     color: 'blue'
                //   }
                // },
                polygon: false,
                rectangle: false,
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
                    url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    type: 'xyz'
                }
              },
              overlays: maplayer
            }
          }
        });

        leafletData.getMap().then(function(map){
          var drawnItems = vm.map.drawOptions.edit.featureGroup;
          drawnItems.addTo(map);
          // map.on('draw:created', function(e){
          //   var layer = e.layer;
          //   drawnItems.addLayer(layer);
          //   logger.info('created', drawnItems.toGeoJSON());
          //   vm.updateSpatialUnion(drawnItems.toGeoJSON());
          // });

          // map.on('draw:deleted', function(e){
          //   var layer = e.layer;
          //   drawnItems.removeLayer(layer);
          //   logger.info('deleted', drawnItems.toGeoJSON());
          //   vm.updateSpatialUnion(drawnItems.toGeoJSON());
          // });
          
          map.on('draw:edited', function(e){
            // toGeoJSON creates a FeatureCollection but we only need one feature
            // therefore only send the feature
            vm.updateSpatialUnion(drawnItems.toGeoJSON().features[0]);
          });
        });
      }
        
      function prepareTemporal(){
        if(angular.isUndefined(vm.spacetime.temporal.begin) || vm.spacetime.temporal.begin == null){
           vm.spacetime.temporal.begin = new Date();
           logger.info('setting new begin date');
        } else {
          vm.spacetime.temporal.begin = new Date(vm.spacetime.temporal.begin);
          logger.info('found existing begin date');
        }
        if(angular.isUndefined(vm.spacetime.temporal.end) || vm.spacetime.temporal.end == null){
          vm.spacetime.temporal.end = new Date();
          logger.info('setting new end date');
        } else {
          vm.spacetime.temporal.end = new Date(vm.spacetime.temporal.end);
          logger.info('found existing end date');
        }
        vm.updateTemporal('begin', vm.spacetime.temporal.begin);
        vm.updateTemporal('end', vm.spacetime.temporal.end);
      }
    }
})();
