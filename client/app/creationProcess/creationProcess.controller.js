(function(){
    'use strict';

    angular
        .module('starter')
        .controller('CreationProcessController', CreationProcessController);
    
    CreationProcessController.$inject = ['$rootScope', '$stateParams', 'httpRequests', '$log'];

    function CreationProcessController($rootScope, $stateParams, httpRequests, $log){
        var cpctrl = this;
        cpctrl.ercID = $stateParams.ercid;
        cpctrl.getMetadata = getMetadata();
        $rootScope.meta = {};
        function getMetadata(){
            httpRequests
                .singleCompendium(cpctrl.ercID)
                .then(response)
                .catch(errorHandler);
            
            function response(res){
                $log.debug("meta loaded")
                $log.debug(res.data.metadata.o2r)
                $rootScope.meta = res.data.metadata.o2r;
            }

            function errorHandler(e){
				$log.debug(e);
				deferred.resolve(e);                
            }
        }
        cpctrl.updateMetadata = function(){
            $log.debug($rootScope.meta)
            httpRequests.updateMetadata(cpctrl.ercID, $rootScope.meta)
            .then(function(res){
                 $log.debug(res);   
            })
            .catch(function(e){
                $log.debug(e);
            })
        }
    }

})();