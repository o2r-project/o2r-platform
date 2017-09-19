(function(){


    'use strict';

    angular
        .module('starter')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$scope','$stateParams','$state', '$q', '$filter', '$log', 'httpRequests', '$location', 'searchAll', 'searchResults', 'header', 'icons','leafletData', 'search'];
    function SearchController($scope,$stateParams, $state, $q, $filter, $log, httpRequests, $location,searchAll, searchResults, header, icons,leafletData, search){
        var logger = $log.getInstance('SearchCtrl');
        var abstractLimit = 200;
        var fullSearch = searchAll.hits.hits;
        var coordinates_selected = {};
        coordinates_selected.geometry = {};
        coordinates_selected.geometry.coordinates = angular.fromJson($stateParams.coords);
        var from;
        var to;
        var mindate;
        var maxdate;
        var dates;

        var vm = this;
        vm.allPubs;
        vm.showResults;
        vm.toggleAbstract = toggleAbstract;
        vm.cutAbstract = [];
        vm.icons = icons;
        vm.searchTerm = $stateParams.q; // reads term query from url
        vm.callingsearch=callingsearch;
        vm.hits = searchResults.hits.total;

        logger.log('coords', coordinates_selected);
        activate();
        
        //////////////
            
            
        function activate(){
            header.setTitle('o2r - Search');
            if(angular.isUndefined($stateParams.q) 
                && (angular.isUndefined($stateParams.from) || ($stateParams.from == "null")) 
                && (angular.isUndefined($stateParams.to) || ($stateParams.to == "null")) 
                && (angular.isUndefined($stateParams.coords) || ($stateParams.coords == "null"))
            ){
                vm.showResults = false;
            } else vm.showResults = true;
            
            map(searchResults);
            calcDateRange(fullSearch);
            var fromVal, toVal;
            //check if from value is defined and set slider position to this value, otherwise set it to start value
            if((angular.isUndefined($stateParams.from) || ($stateParams.from == "null"))) fromVal = dates[0];
            else {
                // remove double quotes
                var tmp_from = $stateParams.from.substring(1, $stateParams.from.length-1);
                fromVal = angular.fromJson(new Date(tmp_from));
            }
            //check if to value is defined and set slider position to this value, otherwise set it to start value
            if((angular.isUndefined($stateParams.to) || ($stateParams.to == "null"))) toVal = dates[dates.length-1];
            else {
                // remove double quotes
                var tmp_to = $stateParams.to.substring(1, $stateParams.to.length-1);
                toVal = angular.fromJson(new Date(tmp_to));
            }

            vm.slider = {
                minValue: fromVal,
                maxValue: toVal,
                options : {
                    stepsArray: dates,
                    translate: function(date) {
                        if (date != null)
                        from = vm.slider.minValue;
                        to = vm.slider.maxValue;
                        return $filter('date')(date, 'MM/yyyy');
                    },
                    onEnd: callingsearch
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
            // set min and max dates to first date in array
            var min = new Date(pubs[0]._source.metadata.o2r.temporal.begin);
            var max = new Date(pubs[0]._source.metadata.o2r.temporal.end);
            //check if following dates are later or earlier
            for(var i in pubs){
                var tmp_begin = new Date(pubs[i]._source.metadata.o2r.temporal.begin);
                var tmp_bg_year = angular.toJson(tmp_begin.getUTCFullYear());
                var tmp_bg_month = angular.toJson(tmp_begin.getUTCMonth()+1);
                if(tmp_bg_month.length == 1) tmp_bg_month = '0' + tmp_bg_month;
                tmp_begin = new Date(tmp_bg_year + '-' + tmp_bg_month);

                var tmp_end = new Date(pubs[i]._source.metadata.o2r.temporal.end);
                var tmp_en_year = angular.toJson(tmp_end.getUTCFullYear());
                var tmp_en_month = angular.toJson(tmp_end.getUTCMonth()+2);
                if(tmp_en_month.length == 1) tmp_en_month = '0' + tmp_en_month;
                tmp_end = new Date(tmp_en_year + '-' + tmp_en_month);

                if(tmp_begin < min) min = tmp_begin;
                if(tmp_end > max) max = tmp_end;

            }
            mindate = angular.copy(min);
            maxdate = angular.copy(max);
            dates = [mindate];
            // add steps for slider
            while(min < maxdate){
                // always use first of month for slider
                min.setUTCMonth(min.getUTCMonth() + 1);
                dates.push(angular.copy(min));
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
                from: angular.toJson(from.toISOString()), 
                to: angular.toJson(to.toISOString()), 
                coords: coords
            });
        }
  }
})();
