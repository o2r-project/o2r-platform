(function(){
    'use strict';

    angular
        .module('starter')
        .controller('SpaceTimeController', SpaceTimeController);
    
    SpaceTimeController.$inject = ['$rootScope', '$scope', 'leafletDrawEvents'];

    function SpaceTimeController($rootScope, $scope, leafletDrawEvents){
    var drawnItems = new L.FeatureGroup();
    $rootScope.meta.temporal.begin = new Date();
    $rootScope.meta.temporal.end = new Date();

    $scope.changeDate = function changeDate(type, newDate){
      if(type == "start"){
        $rootScope.meta.temporal.begin = newDate
      }
      if(type == "end"){
        $rootScope.meta.temporal.end = newDate
      }
    }

    angular.extend($scope, {
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
            polyline:false
            ,
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
        }
      }
    });

    var handle = {
      created: function(e,leafletEvent, leafletObject, model, modelName) {
        drawnItems.addLayer(leafletEvent.layer);
        $rootScope.meta.spatial.union = (drawnItems.toGeoJSON());
      },
      edited: function(arg) {},
      deleted: function(arg) {
        var layers;
        layers = arg.layers;
        drawnItems.removeLayer(layer);
      },
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
        
    }

})();