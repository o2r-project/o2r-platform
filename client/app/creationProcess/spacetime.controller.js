(function(){
    'use strict';

    angular
        .module('starter')
        .controller('SpaceTimeController', SpaceTimeController);
    
    SpaceTimeController.$inject = ['$log', '$scope', 'leafletDrawEvents', 'leafletData', 'creationObject'];

    function SpaceTimeController($log, $scope, leafletDrawEvents, leafletData, creationObject){
      var logger = $log.getInstance('SpaceTime');

      var drawnItems = new L.FeatureGroup();
    
      var vm = this;
      vm.spacetime = creationObject.getSpacetime();
      //vm.changeDate = changeDate;
      vm.updateTemporal = creationObject.updateTemporal;
      
      vm.updateTemporalBegin = creationObject.updateTemporalBegin;
      vm.updateTemporalEnd = creationObject.updateTemporalEnd;
      vm.updateSpatialFiles = creationObject.updateSpatialFiles;

      $scope.$on('$destroy', function(){
          logger.info(angular.toJson(creationObject.getSpacetime()));
      });

      activate();

      ////////

      function activate(){
        prepareTemporal();

        if(!angular.equals(vm.spacetime.spatial.files, {})){
          L.geoJson(vm.spacetime.spatial.files, {
            onEachFeature: function(feature, layer){
              drawnItems.addLayer(layer);
            }
          });
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
                polygon: {
                  metric: false,
                  showArea: true,
                  drawError: {
                    color: '#b00b00',
                    timeout: 1000
                  },
                  shapeOptions: {
                    color: 'blue'
                  }
                },
                polyline:false,
                circle:false
                /*circle: {
                  showArea: true,
                  metric: false,
                  shapeOptions: {
                    color: '#662d91'
                  }
                }*/,
                marker: true
              },
              edit: {
                featureGroup: drawnItems,
                remove: true
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
              overlays: {
                "Geojson": {
                  name: 'Union',
                  type: 'geoJSONShape',
                  data: vm.spacetime.spatial.files,
                  visible: true
                }
              }
            }
          }
        });

        leafletData.getMap().then(function(map){
          var drawnItems = vm.map.drawOptions.edit.featureGroup;
          drawnItems.addTo(map);
          map.on('draw:created', function(e){
            var layer = e.layer;
            drawnItems.addLayer(layer);
            vm.updateSpatialFiles(drawnItems.toGeoJSON());
          });

          map.on('draw:deleted', function(e){
            var layer = e.layer;
            drawnItems.removeLayer(layer);
            vm.updateSpatialFiles(drawnItems.toGeoJSON());
          });

          map.on('draw:edited', function(e){
            vm.updateSpatialFiles(drawnItems.toGeoJSON());
          })
        });
      }

      function changeDate(type, newDate){
        if(type == "start"){
          vm.updateTemporal('begin', newDate);
        }
        if(type == "end"){
          vm.updateTemporal('end', newDate);
        }
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