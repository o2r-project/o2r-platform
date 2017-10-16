(function(){
    'use strict';

    angular
        .module('starter')
        .controller('SubstituteController', SubstituteController);

    SubstituteController.$inject = ['$scope', '$log', '$stateParams', '$q', 'httpRequests', 'substituteInfoService', 'metadataSimComp', 'icons'];
    function SubstituteController($scope, $log, $stateParams, $q, httpRequests, substituteInfoService, metadataSimComp, icons){
        var logger = $log.getInstance('SubstituteCtrl');
        var vm = this;

        logger.info("Substituter is working in compendium: "+ $stateParams.ercid);

        vm.icons = icons;
        vm.similarPubs = getMetadataSimComp();
        console.log("vm.similarPubs");
        console.log(vm.similarPubs);
        vm.substituteOptions = getSubstituteOptions;

        $scope.$on('loadedSimilarComps', function(event, data){ //similarPubs will be set to comp_meta from metadata factory
            vm.similarPubs = data;
            console.log("data");
            console.log(data);
            console.log(vm.similarPubs);
            logger.warn("Hello the broadcast is here.");
        });

        //////////////////

        function getMetadataSimComp(){
            if(metadataSimComp.status == 404){
                return false;
            }
            return substituteInfoService; // metadataSimComp.callMetadata_simComp;
        }

        function getSubstituteOptions(pub) {
            console.log("getSubstituteOptions");
            console.log(pub);
        }


    }
})()
