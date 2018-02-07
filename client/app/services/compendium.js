(function(){
    'use strict';

    angular
        .module('starter')
        .factory('compendium', compendium);

    compendium.$inject = ['$rootScope', '$log'];

    function compendium($rootScope, $log){
        var logger = $log.getInstance('CompendiumFactory');

        var metadata = {};

        var service = {
            getCompendium: getCompendium,
            setCompendium: setCompendium
        };

        return service;

        function getCompendium(){
            return compendium;
        }

        function setCompendium(comp){
            compendium = comp;
            $rootScope.$broadcast('loadedCompendium');
            logger.info('set compendium to', comp.id);
        }

    }
})();
