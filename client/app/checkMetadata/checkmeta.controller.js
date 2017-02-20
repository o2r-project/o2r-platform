(function(){
    'use strict';

    angular
        .module('starter')
        .controller('CheckMetaController', CheckMetaController);
    
    CheckMetaController.$inject = ['$scope', '$stateParams', 'httpRequests'];

    function CheckMetaController($scope, $stateParams, httpRequests){
        var vm = this;
        vm.ercID = $stateParams.ercid;
        vm.getMetadata = getMetadata();
        $scope.meta = null;
        function getMetadata(){
            httpRequests
                .singleCompendium(vm.ercID)
                .then(response)
                .catch(errorHandler);
            
            function response(res){
                console.log(res.data.metadata.o2r)
                $scope.meta = res.data.metadata.o2r;
            }

            function errorHandler(e){
				$log.debug('callMetadata_author errorHandler: %o',e);
				deferred.resolve(e);                
            }
        }

    }

})();