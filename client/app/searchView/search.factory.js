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
        /**
         * Prepares the search query for a spatio-temporal search
         * @param {String} index 
         * @param {String} term 
         * @param {Array} coordinates_selected 
         * @param {Date} from 
         * @param {Date} to 
         * @param {Integer} start 
         * @param {Integer} size 
         */
        function prepareQuery(index, term, coordinates_selected, from, to, start, size) {
            if(!index) throw 'Error: No search index defined';
            // helper to indicate which parameters are (un)defined
            if(!term) logger.info('No search term defined');
            if(!coordinates_selected) logger.info('No coordinates defined');
            if(!from) logger.info('No start time defined');
            if(!to) logger.info('No end time defined');
            if(!start) logger.info('No start index defined');
            if(!size) logger.info('No size defined');
            
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
            if((start == 0) || start){
                query.body.from = start;
            }
            if(size){
                query.body.size = size;
            }
            
            return query;
        }

        function search(query){
            logger.info('Searching with', angular.toJson(query));
            return esClient.search(query);
        }
    }
})();