(function(){
    'use strict';

    angular
        .module('starter')
        .factory('customLeaflet', customLeaflet);
    
    customLeaflet.$inject = ['$q', 'leafletData', 'icons'];
    function customLeaflet($q, leafletData, icons){
        var service = {
            getDefaultStyle: getDefaultStyle,
            getHighlightStyle: getHighlightStyle,
            getSearchBoxStyle: getSearchBoxStyle,
            createResetHighlightControl: createResetHighlightControl,
            resetAllUnhoveredMap: resetAllUnhoveredMap,
            highlightMap: highlightMap,
            getDrawControls: getDrawControls,
            getDrawOverlays: getDrawOverlays,
            getMapBoxLight: getMapBoxLight
        };

        return service;

        function getDefaultStyle(){
            return {
                fillColor: "#004286",
                weight: 1,
                opacity: 1,
                color: 'white',
                fillOpacity: 0.6
            };
        }

        function getHighlightStyle(){
            return {
                fillColor: "black",
                weight: 1,
                opacity: 1,
                color: 'white',
                fillOpacity: 1
            };
        }

        function getSearchBoxStyle(){
            return {
                color: '#434553',
                weight: 2,
                fillColor: '#434553',
                opacity: 0.6,
                fillOpacity: 0.2
            };
        }

        function createResetHighlightControl(fct){
            var resetHighlightControl = new L.control();
            resetHighlightControl.setPosition('topleft');
            resetHighlightControl.onAdd = function(){
                var className = 'leaflet-custom-control';
                var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
                container.title = 'Reset Highlighting';
                var a = L.DomUtil.create('a', '', container);
                a.setAttribute('href', '');
                a.style.backgroundImage = "url(" + icons.highlight_off + ")";
                a.style.backgroundSize = '20px 20px';
                L.DomEvent.addListener(container, 'click', function(event){
                    L.DomEvent.preventDefault(event);
                    fct();
                    resetAllUnhoveredMap();
                });
                return container;
            }
            return resetHighlightControl;
        }

        function resetAllUnhoveredMap(){
            var deferred = $q.defer();
            leafletData.getLayers().then(function(lyrs){
                var searchResultsLayer = lyrs.overlays.geojson;
                for(var i in searchResultsLayer._layers){
                    searchResultsLayer._layers[i].setStyle(getDefaultStyle());
                }
                deferred.resolve();
            });
            return deferred.promise;
        }

        function highlightMap(id, fct){
            // check which map element has the matching id property and highlight this
            leafletData.getLayers().then(function(lyrs){
                var searchResultsLayer = lyrs.overlays.geojson;
                for(var i in searchResultsLayer._layers){
                    if(searchResultsLayer._layers[i].feature.properties.id == id){
                        searchResultsLayer._layers[i].setStyle(getHighlightStyle());
                        searchResultsLayer._layers[i].bringToFront();
                    } else {
                        searchResultsLayer._layers[i].setStyle(getDefaultStyle());
                    }
                }
            });
            // remove old highlighting from hovering over map
            fct();
        }

        function getDrawControls(){
            return {
                draw:{
                    rectangle: {
                        shapeOptions: getSearchBoxStyle()
                    },
                    polyline:false,
                    circle:false,
                    polygon: false,
                    marker: false
                }
            };
        }

        function getDrawOverlays(){
            return {
                name: 'draw',
                type: 'group',
                visible: true,
                layerParams: {
                    showOnSelector: false
                }
            };
        }

        function getMapBoxLight(){
            return {
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
            };
        }
    }
})();