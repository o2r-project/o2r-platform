(function(){
    'use strict';

    angular
        .module('starter')
        .controller('CreationProcessController', CreationProcessController);
    
    CreationProcessController.$inject = ['$rootScope', '$scope', '$stateParams', 'httpRequests', '$log'];

    function CreationProcessController($rootScope, $scope, $stateParams, httpRequests, $log){
        $scope.ercID = $stateParams.ercid;
        $scope.getMetadata = getMetadata();
        $rootScope.meta = {};
        function getMetadata(){
            httpRequests
                .singleCompendium($scope.ercID)
                .then(response)
                .catch(errorHandler);
            
            function response(res){
                console.log("meta loaded")
                $rootScope.meta = res.data.metadata.o2r;
            }

            function errorHandler(e){
				$log.debug(e);
				deferred.resolve(e);                
            }
        }
        $scope.updateMetadata = function(){
            console.log($rootScope.meta)
            httpRequests.updateMetadata($scope.ercID, $rootScope.meta)
            .then(function(res){
                 $log.debug(res);   
            })
            .catch(function(e){
                $log.debug(e);
            })
        }
    }

})();