(function(){
    'use strict';

    angular
        .module('starter')
        .controller('SpaceTimeController', SpaceTimeController);
    
    SpaceTimeController.$inject = ['$log', '$scope', 'leafletDrawEvents', 'leafletData', 'creationObject'];

    function SpaceTimeController($log, $scope, leafletDrawEvents, leafletData, creationObject){
      var drawnItems = new L.FeatureGroup();
    
      var vm = this;
      vm.spacetime = creationObject.getSpacetime();
      vm.changeDate = changeDate;
      
      vm.updateTemporalBegin = creationObject.updateTemporalBegin;
      vm.updateTemporalEnd = creationObject.updateTemporalEnd;
      vm.updateSpatialUnion = creationObject.updateSpatialUnion;

      $scope.$on('$destroy', function(){
          $log.debug('spacetime metadata: ', angular.toJson(creationObject.getSpacetime()));
      });

      activate();

      ////////

      function activate(){
        if(angular.isUndefined(vm.spacetime.temporal.begin) || vm.spacetime.temporal.begin == null){
           vm.spacetime.temporal.begin = new Date();
           vm.updateTemporalBegin(vm.spacetime.temporal.begin);
           $log.debug('setting new begin date');
        }
        if(angular.isUndefined(vm.spacetime.temporal.end) || vm.spacetime.temporal.end == null){
           vm.spacetime.temporal.end = new Date();
           vm.updateTemporalEnd(vm.spacetime.temporal.end);
           $log.debug('setting new end date');
        }
        if(!angular.equals(vm.spacetime.spatial.union, {})){
          L.geoJson(vm.spacetime.spatial.union, {
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
                  data: vm.spacetime.spatial.union,
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
            vm.updateSpatialUnion(drawnItems.toGeoJSON());
          });

          map.on('draw:deleted', function(e){
            var layer = e.layer;
            drawnItems.removeLayer(layer);
            vm.updateSpatialUnion(drawnItems.toGeoJSON());
          });

          map.on('draw:edited', function(e){
            vm.updateSpatialUnion(drawnItems.toGeoJSON());
          })
        });
      }

      function changeDate(type, newDate){
        if(type == "start"){
          vm.updateTemporalBegin(newDate);
        }
        if(type == "end"){
          vm.updateTemporalEnd(newDate);
        }
      }
      /*
      function created(e,leafletEvent, leafletObject, model, modelName) {
        drawnItems.addLayer(mylayer);
        vm.updateSpatialUnion(drawnItems.toGeoJSON());
      }

      function deleted(arg) {
          var layers;
          layers = arg.layers;
          drawnItems.removeLayer(layers);
      }

      var handle = {
        created: created,
        edited: function(arg) {},
        deleted: deleted,
        drawstart: function(arg) {},
        drawstop: function(arg) {},
        editstart: function(arg) {},
        editstop: function(arg) {},
        deletestart: function(arg) {},
        deletestop: function(arg) {}
      };

      var drawEvents = leafletDrawEvents.getAvailableEvents();
      drawEvents.forEach(function(eventName){
          $scope.$on('leafletDirectiveDraw.' + eventName, function(e, payload) {
            //{leafletEvent, leafletObject, model, modelName} = payload
            var leafletEvent, leafletObject, model, modelName; //destructuring not supported by chrome yet :(
            leafletEvent = payload.leafletEvent, leafletObject = payload.leafletObject, model = payload.model,
            modelName = payload.modelName;

            handle[eventName.replace('draw:','')](e,leafletEvent, leafletObject, model, modelName);
          });
      });
      */
        
    }
})();