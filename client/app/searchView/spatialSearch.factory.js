(function(){
    'use strict';

    angular
        .module('starter')
        .factory('spatialSearch', spatialSearch);
    
    spatialSearch.$inject = ['$log', '$stateParams'];
    function spatialSearch($log, $stateParams){
        var service = {
            spatialSearch: spatialSearch
        };
        return service;

        //////////

        function spatialSearch(coordinates_selected,from,to,x) {
            var logger = $log.getInstance('spatialSearch');
            var coords = coordinates_selected.geometry.coordinates;
            logger.info('c', angular.toJson(coordinates_selected.geometry.coordinates));
            logger.info(from);
            logger.info(to);
            logger.info(x);
            var b = {
                "query": {
                    "bool": {
                        "must": [
							{
                                "range": {
                                    "metadata.o2r.temporal.begin": {
                                        "from": from
                                    }
                                }
                            },
                            {
                                "range": {
                                    "metadata.o2r.temporal.end": {
                                        "to": to
                                    }
                                }
                            },
                            {
                                "bool": {
                                    "must": {
                                        "match_all": {}
                                    },
                                    "filter": {
                                        "geo_shape": {
                                            "metadata.o2r.spatial.geometry": {
                                                "shape": {
                                                    "type": "polygon",
                                                    "coordinates": coords


                                                },
                                                "relation": "within"
                                            }
                                        }
                                    }
                                }
                            },
                            {
    							"match" : { 
									"metadata.o2r.title" :$stateParams.q 
								}
  							}
                        ]
                    }
                }
            };
            return b;
        }
    }
})();