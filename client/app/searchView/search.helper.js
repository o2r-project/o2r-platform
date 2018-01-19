(function(){
    'use strict';

    angular
        .module('starter')
        .factory('searchHelper', searchHelper);
    
    searchHelper.$inject = ['$log'];
    function searchHelper($log){
        var logger = $log.getInstance('searchHelper');
        var service = {
            removeJobHits: removeJobHits
        };

        return service;

        //////////

        /**
         * Remove all hits that are jobs
         * @param {Object} obj , elastic search response
         */
        function removeJobHits(obj){
            var result = angular.copy(obj);
            result.hits.hits = [];
            for(var i in obj.hits.hits){
                if(obj.hits.hits[i]._source.hasOwnProperty('metadata')){
                    result.hits.hits.push(obj.hits.hits[i]);
                }
            }
            result.hits.total = result.hits.hits.length;
            logger.info('removed job hits. resulting in ', result);
            return result;
        }
    }
})();