(function(){
    'use strict';

    angular
        .module('starter')
        .service('esClient', esClient);
    
    esClient.$inject = ['esFactory'];
    function esClient(esFactory){
        return esFactory({
            host: 'http://localhost/api/v1/search',
            apiVersion: '5.5',
            log: 'trace'
        });
    }
})();