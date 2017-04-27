(function(){
  var coordinates_selected;

    'use strict';

    angular
        .module('starter')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$scope','$stateParams','$q', '$log', 'httpRequests', '$log', '$location', 'searchResults', 'header', 'icons','leafletData'];
    function SearchController($scope,$stateParams, $q, $log, httpRequests, $log, $location, searchResults, header, icons,leafletData){
      var vm = this;
        vm.icons = icons;
        vm.searchTerm = $stateParams.q; // reads term query from url
        vm.allPubs = map(searchResults);
        vm.allPubs.data.hits.hits.length>0 ? vm.selectedComp = vm.allPubs.data.hits.hits[0]._source : null;
        vm.selectComp = (comp) => {vm.selectedComp = comp};
        vm.submit = search;
        vm.button= callingspatialsearch;

        $log.debug('SearchCtrl, vm.allPubs %o', vm.allPubs);
        $log.debug('SearchCtrl, searchTerm %s', vm.searchTerm);

        activate();

        //////////////

        angular.extend($scope, {
                center: {
                    lat: 51.505,
                    lng: 10.09,
                    zoom: 3
                },
                controls: {
                  scale:true,
                  draw: {}

                },


                layers: {
                    baselayers: {
                        mapbox_light: {
                            name: 'Mapbox Streets',
                            url: 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmVoYW5zNTE2IiwiYSI6ImNpeWxjcWNkODAwNGwzM3FxamR6a2gxOXkifQ.PuUfs90MyfmVGYVqx0AoUw',
                            type: 'xyz',
                            layerOptions: {
                                apikey: 'pk.eyJ1IjoicmVoYW5zNTE2IiwiYSI6ImNpeWxjcWNkODAwNGwzM3FxamR6a2gxOXkifQ.PuUfs90MyfmVGYVqx0AoUw',
                                mapid: 'mapbox.streets',
                                format: '@2x.png'
                            },
                            layerParams: {
                                showOnSelector: false
                            }
                        }
                    },
                    overlays: {
                        draw: {
                            name: 'draw',
                            type: 'group',
                            visible: true,
                            layerParams: {
                                showOnSelector: false
                            }
                        }


                    }
                }

           });


           leafletData.getMap().then(function(map) {

               leafletData.getLayers().then(function(baselayers) {
                 var drawnItems = baselayers.overlays.draw;

                  map.on('draw:created', function (e) {

                    var layer = e.layer;


                    drawnItems.addLayer(layer);



                    console.log(JSON.stringify(layer.toGeoJSON()));
                    coordinates_selected = layer.toGeoJSON();

                  });
               });
           });

        function activate(){
            header.setTitle('o2r - Search');
        }

        function search(){
            if (angular.isDefined(vm.searchModel) && vm.searchModel.trim() != ""){
                $log.debug('searching for %s', vm.searchModel);
                $location.path('/search').search('q=' + vm.searchModel);
            }
        }

        function map(obj){

           var o = obj.data.hits.hits;
           var b=[];
            for(var i in o){
                o[i]._source.id = o[i]._source.compendium_id;
                try{
                b.push(o[i]._source.metadata.o2r.spatial.union.features[0]);

                {


                }
                throw error()
              }
              catch (g){
                console.error("missing spatial");
                }
            }
            $log.debug('mconfiging result: %o', o,b);
            angular.extend($scope, {
                        geojson: {
                            data: b,
                            style: {
                                fillColor: "green",
                                weight: 2,
                                opacity: 1,
                                color: 'white',
                                dashArray: '3',
                                fillOpacity: 0.7
                            }
                        }
                    });


            return obj;
        }
//myLayer.addData(b);
//var myLayer = L.geoJSON().addTo(map);

function callingspatialsearch(){
  console.log('calling spatial search');
  var deferred = $q.defer();
 httpRequests.
 spatialsearch(coordinates_selected)
 .then(cb1)
 .catch(errorHandler);
return deferred.promise;


    function cb1(response){
      $log.debug('result of search: %o', response);
      deferred.resolve(response);
    }

    function errorHandler(e){
      $log.debug('search error: %o', e);
      deferred.resolve(e);
    }
  }

  }
})();
