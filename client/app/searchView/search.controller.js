(function(){


    'use strict';

    angular
        .module('starter')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$scope','$stateParams','$state', '$q', '$filter', '$log', '$interval', 'httpRequests', '$location', 'searchAll', 'searchResults', 'header', 'icons','leafletData', 'search', 'customLeaflet'];
    function SearchController($scope,$stateParams, $state, $q, $filter, $log, $interval, httpRequests, $location,searchAll, searchResults, header, icons,leafletData, search, customLeaflet){
        var logger = $log.getInstance('SearchCtrl');
        var abstractLimit = 200;
        var fullSearch = searchAll.hits.hits;
        var coordinates_selected = {
            type: "Feature",
            geometry: {
                type: "Polygon",
                coordinates: angular.fromJson($stateParams.coords)
            }
        };
        var from;
        var to;
        var mindate;
        var maxdate;
        var dates;
        var startindex = parseInt($stateParams.start) || 0;
        var size = parseInt($stateParams.size) || 10;

        var vm = this;
        vm.allPubs;
        vm.showResults;
        vm.toggleAbstract = toggleAbstract;
        vm.cutAbstract = [];
        vm.icons = icons;
        vm.searchTerm = $stateParams.q; // reads term query from url
        vm.callingsearch=callingsearch;
        vm.hits = searchResults.hits.total;
        vm.highlightMap = customLeaflet.highlightMap;
        vm.resetAllUnhoveredList = resetAllUnhoveredList;
        vm.busyLoading = false;
        vm.infiniteItems = {
            numLoaded_: searchResults.hits.hits.length,
            total_: vm.hits,
            size_: size,
            startindex_: startindex,
            getItemAtIndex: function(index) {
                if (index > this.numLoaded_){
                    this.fetchMoreItems_(index);
                    return null;
                }
                return vm.allPubs[index];
            },
            getLength: function() {
                return this.numLoaded_;
            },
            fetchMoreItems_: function(index) {
                if (this.total_ > this.numLoaded_) {
                    vm.busyLoading = true;
                    this.numLoaded_ = this.total_;
                    var coords = angular.fromJson(coordinates_selected.geometry.coordinates);
                    this.startindex_ += this.size_;
                    var q = search.prepareQuery('o2r', vm.searchTerm, coords, from.toISOString(), to.toISOString(), this.startindex_, this.size_);
                    search.search(q)
                        .then(angular.bind(this, function(response){
                            searchResults.hits.hits = searchResults.hits.hits.concat(response.hits.hits);
                            this.numLoaded_ = searchResults.hits.hits.length;
                            map(searchResults);
                        }));
                } else {
                    vm.busyLoading = false;
                } 
            }
        };

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
            
            angular.extend(vm, {
                controls: {
                    scale:true,
                    draw: customLeaflet.getDrawControls(),
                    custom: []
                },
                layers: {
                    baselayers: {
                        mapbox_light: customLeaflet.getMapBoxLight()
                    },
                    overlays: {
                        draw: customLeaflet.getDrawOverlays()
                    }
                }
            });

            vm.controls.custom.push(customLeaflet.createResetHighlightControl(resetAllUnhoveredList));
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

            
            if(angular.isDefined(coordinates_selected.geometry.coordinates)){
                angular.extend(vm.layers.overlays, {
                    searchFrame: {
                        name: 'Search Box',
                        type: 'geoJSONShape',
                        data: coordinates_selected,
                        visible: true,
                        doRefresh: true,
                        layerOptions: {
                            clickable: false,
                            style: customLeaflet.getSearchBoxStyle()
                        }
                    }
                });
            }

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
                    
                    if(angular.isDefined(baselayers.overlays.geojson)){
                        baselayers.overlays.geojson.bringToFront();
                    }

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
                    vm.allPubs[i]._source.metadata.o2r.spatial.spatial.union.geojson.properties = {
                        id: i
                    };
                    b.push(vm.allPubs[i]._source.metadata.o2r.spatial.spatial.union.geojson);
                } catch (g){
                    logger.error("missing spatial in ", i);
                }
                vm.cutAbstract[i] = abstractLimit;
            }
            

            // dynamically set zoom level to full extend of objects
            var group;
            if(angular.isDefined(coordinates_selected.geometry.coordinates)){
                group = new L.geoJson(coordinates_selected);
            } else if(b.length > 0){
                var group = new L.geoJson(b);
            }

            // only set zoomlevel, if search returns results
            if(vm.hits){
                leafletData.getMap().then(function(map){
                    map.fitBounds(group.getBounds(), {padding: [50,50]});
                });
            }
            

            angular.extend(vm.layers.overlays, {
                geojson: {
                    name: 'searchResults',
                    type: 'geoJSONShape',
                    data: b,
                    visible: true,
                    doRefresh: true,
                    layerOptions: {
                        onEachFeature: function(feat, featLyr){
                            featLyr.on('mouseover', function(event){
                                customLeaflet.resetAllUnhoveredMap().then(function(){
                                    featLyr.setStyle(customLeaflet.getHighlightStyle());
                                    featLyr.bringToFront();
                                    highlightList(feat.geometry.coordinates);
                                });
                            });
                        },
                        clickable: true,
                        style: customLeaflet.getDefaultStyle()
                    },
                    layerParams: {
                        showOnSelector: false
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
                coords: coords,
                start: startindex,
                size: size
            });
        }

        function highlightList(coords){
            // check if coords of list entry match those of hovered object
            for(var i in vm.allPubs){
                var match = angular.equals(coords, vm.allPubs[i]._source.metadata.o2r.spatial.spatial.union.geojson.geometry.coordinates);
                // if true, highlight list entry
                if(match){
                    vm.allPubs[i].highlight = true;
                } else {
                    vm.allPubs[i].highlight = false;
                }
            }
        }

        function resetAllUnhoveredList(){
            for(var i in vm.allPubs){
                vm.allPubs[i].highlight = false;
            }
        }
  }
})();
