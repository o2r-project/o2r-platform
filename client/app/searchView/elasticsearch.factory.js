(function(){
    'use strict';

    angular
        .module('starter')
        .service('esClient', esClient);
    
    esClient.$inject = ['esFactory'];
    function esClient(esFactory){
        return esFactory({
            host: 'http://giv-project15.uni-muenster.de:9200',
            apiVersion: '5.5',
            log: 'trace'
        });
    }
})();