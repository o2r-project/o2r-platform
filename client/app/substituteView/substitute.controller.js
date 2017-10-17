(function(){
    'use strict';

    angular
        .module('starter')
        .controller('SubstituteController', SubstituteController);

    SubstituteController.$inject = ['$scope', '$log', '$stateParams', '$q', 'httpRequests', 'substituteInfoService', 'metadataSimComp', 'icons', 'erc'];
    function SubstituteController($scope, $log, $stateParams, $q, httpRequests, substituteInfoService, metadataSimComp, icons, erc){
        var logger = $log.getInstance('SubstituteCtrl');
        var vm = this;

        logger.info("Substituter is working in compendium: "+ $stateParams.ercid);

        vm.icons = icons;
        vm.similarPubs = getMetadataSimComp();
        vm.substituteOptions = getSubstituteOptions;
        vm.publication = erc;

        $scope.$on('loadedSimilarComps', function(event, data){ //similarPubs will be set to comp_meta from metadata factory
            vm.similarPubs = data;
        });

        //////////////////

        function getMetadataSimComp(){
            if(metadataSimComp.status == 404){
                return false;
            }
            return substituteInfoService; // metadataSimComp.callMetadata_simComp;
        }

        function getSubstituteOptions(pub) {
            logger.info("base and overlay ERC choosen for substitution");
            var base = vm.publication;
            var overlay = pub;
            
            console.log(base);
            console.log(overlay);
        }


    }
})()
