(function(){
    'use strict';

    angular
        .module('starter')
        .factory('search', search);
    
    search.$inject = ['$log', '$stateParams', 'esClient', 'esFactory'];
    function search($log, $stateParams, esClient, esFactory){
        var logger = $log.getInstance('searchFactory');
        var service = {
            prepareQuery: prepareQuery,
            search: search
        };
        return service;

        //////////

        function prepareQuery(index, term, coordinates_selected,from,to) {
            if(!index) throw 'Error: No search index defined';
            // helper to indicate which parameters are (un)defined
            if(!term) logger.info('No search term defined');
            if(!coordinates_selected) logger.info('No coordinates defined');
            if(!from) logger.info('No start time defined');
            if(!to) logger.info('No end time defined');
            
            var query = {
                index: index,
                body: {
                    "query": {
                        "bool": {
                            "must": {},
                            "filter": []
                        }
                    }
                }
            };
            
            if(term){
                angular.extend(query.body.query.bool.must, {
                    "match": {
                        "_all": term
                }});
            } else {
                angular.extend(query.body.query.bool.must, {
                    "match_all": {}
                });
            }
            if(from){
                query.body.query.bool.filter.push({
                    "range": {
                        "metadata.o2r.temporal.begin": {
                            "from": from
                        }
                    }
                });
            }
            if(to){
                query.body.query.bool.filter.push({
                    "range": {
                        "metadata.o2r.temporal.end": {
                            "to": to
                        }
                    }
                });
            }
            if(coordinates_selected){
                query.body.query.bool.filter.push({
                    "geo_shape": {
                        "metadata.o2r.spatial.spatial.union.geojson.geometry": {
                            "shape": {
                                "type": "polygon",
                                "coordinates": coordinates_selected
                                
                                
                            },
                            "relation": "within"
                        }
                    }
                });
            }
            
            return query;
        }

        function search(query){
            logger.info('Searching with', angular.toJson(query));
            return esClient.search(query);
        }
    }
})();