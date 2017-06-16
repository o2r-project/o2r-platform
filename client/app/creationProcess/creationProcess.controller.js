(function(){
    'use strict';

    angular
        .module('starter')
        .controller('CreationProcessController', CreationProcessController);
    
    CreationProcessController.$inject = ['$scope', '$log', '$state', 'creationService', 'creationObject', 'httpRequests'];

    function CreationProcessController($scope, $log, $state, creationService, creationObject, httpRequests){
        //default substate
        var defView = 'creationProcess.requiredMetadata';
        var vm = this;
        vm.updateMetadata = updateMetadata;

        $scope.$on('$destroy', function(){
            creationObject.destroy();
        });

        activate();

        /////////

        function activate(){
            creationObject.set(creationService);
            $state.go(defView);
        }

        function updateMetadata(){
            creationObject.removeArtifacts("keywords");
            creationObject.removeArtifacts("paperLanguage");
            creationObject.removeArtifacts("researchQuestions");
            creationObject.removeArtifacts("researchHypotheses");
            var erc = creationObject.get();
            httpRequests
                .updateMetadata(erc.id, erc.metadata.o2r)
                .then(function(res){
                    $log.debug(res);   
                })
                .catch(function(e){
                    $log.debug(e);
                })
        }
    }

})();