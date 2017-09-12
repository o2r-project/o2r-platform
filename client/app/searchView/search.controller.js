(function(){


    'use strict';

    angular
        .module('starter')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$scope','$stateParams','$state', '$q', '$filter', '$log', 'httpRequests', '$location', 'searchResults', 'header', 'icons','leafletData', 'search'];
    function SearchController($scope,$stateParams, $state, $q, $filter, $log, httpRequests, $location, searchResults, header, icons,leafletData, search){
        var logger = $log.getInstance('SearchCtrl');
        var abstractLimit = 200;
        var coordinates_selected;
        var from;
        var to;
        var mindate;
        var maxdate;
        var dates;

        var vm = this;
        vm.allPubs;
        vm.toggleAbstract = toggleAbstract;
        vm.cutAbstract = [];
        vm.icons = icons;
        vm.searchTerm = $stateParams.q; // reads term query from url
        vm.callingsearch=callingsearch;
        vm.hits = searchResults.hits.total;
        vm.clearSearch = clearSearch;
        
        activate();
        
        //////////////
            
            
        function activate(){
            header.setTitle('o2r - Search');
            if(searchResults.hits.total != 0){
                map(searchResults);
                calcDateRange(vm.allPubs);
            } else {
                var tmp_begin = new Date(2000, 1, 1);
                var tmp_end = new Date();
                var tmp_date = [{"_source":{"metadata":{"o2r":{"temporal":{"begin": tmp_begin, "end": tmp_end}}}}}];
                calcDateRange(tmp_date);
            }
            vm.slider = {
                minValue: dates[0],
                maxValue: dates[dates.length-1],
                //value: dates[0], // or new Date(2016, 7, 10) is you want to use different instances
                options: {
                    stepsArray: dates,
                    translate: function(date) {
                        if (date != null)
                        from = vm.slider.minValue;
                        to = vm.slider.maxValue;
                        return $filter('date')(date, 'd/M/yy');
                    },
                    onChange: callingsearch
                }
            };
            angular.extend(vm, {
                center: {
                    lat: 51.505,
                    lng: 10.09,
                    zoom: 3
                },
                controls: {
                    scale:true,
                    draw: {
                        draw: {
                        polyline:false,
                        circle:false,
                        polygon: false,
                        marker: false
                        }
                    }
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
                    logger.info(angular.toJson(layer.toGeoJSON()));
                    coordinates_selected = layer.toGeoJSON();
                    callingsearch(coordinates_selected);
                    });
                });
            });
        }

        function toggleAbstract(index){
            if(vm.cutAbstract[index] == 200) vm.cutAbstract[index] = 1000;
            else if(vm.cutAbstract[index] == 1000) vm.cutAbstract[index] = 200;
            return;
        }

        function calcDateRange(pubs){
            var min = new Date(pubs[0]._source.metadata.o2r.temporal.begin);
            var max = new Date(pubs[0]._source.metadata.o2r.temporal.end);
            for(var i in pubs){
                var tmp_begin = new Date(pubs[i]._source.metadata.o2r.temporal.begin);
                var tmp_end = new Date(pubs[i]._source.metadata.o2r.temporal.end);
                if(tmp_begin < min) min = tmp_begin;
                if(tmp_end > max) max = tmp_end;

            }
            mindate = angular.copy(min);
            maxdate = angular.copy(max);
            var tmp_min = angular.copy(min);
            dates = [mindate];
            var day;
            while(tmp_min < maxdate){
                day = tmp_min.getDate();
                tmp_min = new Date(tmp_min.setDate(++day));
                dates.push(tmp_min);
            }
            return;
        }

        function map(obj){
            logger.info('Search results: ', obj);
            vm.allPubs = obj.hits.hits;
            var b=[];
            for(var i in vm.allPubs){
                try{
                    b.push(vm.allPubs[i]._source.metadata.o2r.spatial.spatial.union.geojson);
                } catch (g){
                    logger.error("missing spatial in ", i);
                }
                vm.cutAbstract[i] = abstractLimit;
            }

            angular.extend(vm, {
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
            return;
        }

        function callingsearch(){
            logger.info('calling spatial search');
            var coords;
            try {
                coords = angular.toJson(coordinates_selected.geometry.coordinates);
            } catch (error) {
                logger.info('No coordinates defined. Setting to null');
                coords = null;
            }
            $state.go('search', {
                q: vm.searchTerm, 
                from: angular.toJson(from), 
                to: angular.toJson(to), 
                coords: coords
            });
        }

        function clearSearch(){
            vm.searchTerm = '';
            from = null;
            to = null;
            coordinates_selected = null;
        }
  }
})();
