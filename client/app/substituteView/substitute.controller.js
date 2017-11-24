(function(){
    'use strict';

    angular
        .module('starter')
        .controller('SubstituteController', SubstituteController);

    SubstituteController.$inject = ['$scope', '$log', '$stateParams', '$q', '$mdDialog', 'httpRequests', 'substituteInfoService', 'metadataSimComp', 'icons', 'erc'];
    function SubstituteController($scope, $log, $stateParams, $q, $mdDialog, httpRequests, substituteInfoService, metadataSimComp, icons, erc){
        var logger = $log.getInstance('SubstituteCtrl');
        var vm = this;
        logger.info("Substituter is working in compendium: "+ $stateParams.ercid);

        vm.icons = icons;
        vm.similarPubs = getMetadataSimComp();
        vm.publication = erc;
        $scope.substituteOptions = getSubstituteOptions;

        // set width of div with ERC title in selection list
        var substERCtitleWidth = $("#substitutionErcSelectionViewTitle").context.body.clientWidth;
        vm.divWidth = parseInt((substERCtitleWidth/100 + 10), 10);

        $scope.$on('loadedSimilarComps', function(event, data){
            // similarPubs will be set to comp_meta from metadata factory
            vm.similarPubs = data;
        });

        //////////////////

        function getMetadataSimComp(){
            if(metadataSimComp.status == 404){
                return false;
            }
            return substituteInfoService; // metadataSimComp.callMetadata_simComp;
        };

        // function to provide files for substitution as candidates
        function getSubstituteOptions(event, pub) {
            logger.info("base and overlay ERC choosen for substitution");
            vm.base = vm.publication;
            vm.overlay = pub;

            if (vm.base.metadata.o2r.inputfiles.length < 1 || vm.overlay.metadata.o2r.inputfiles.length < 1) {
                logger.info("no inputfiles for substitution");
                logger.debug("no inputfiles for substitution");
                window.alert("no substitution possible");
            } else {
                vm.basefiles = getFileCandidates(vm.base);
                vm.overlayfiles = getFileCandidates(vm.overlay);

                $mdDialog.show({
                    contentElement: '#showCandidateView',
                    parent: angular.element(document.body),
                    scope: $scope,
                    preserveScope: true,
                    multiple: true,
                    targetEvent: event,
                    clickOutsideToClose: false
                });
            }
        };

        function getFileCandidates(pub) {
            var candidatesArray = [];
            var inputFilesArray = pub.metadata.o2r.inputfiles;

            for (let i=0; i<inputFilesArray.length; i++) {
                let candidateObject = {};
                let filePath = inputFilesArray[i];
                let char_ = filePath.indexOf("/");
                filePath = filePath.substring(char_+1); // only filename with extension and datapath (without ERC_ID)

                candidateObject.filePath = filePath;
                candidateObject.selected = false;
                // in case the inputFile is in folders in the ERC_ID-folder
                if (filePath.lastIndexOf("/") < 0) {
                    candidateObject.fileName = filePath;
                } else {
                    let char_2 = filePath.lastIndexOf("/");
                    candidateObject.fileName = filePath.substring(char_2+1);
                }
                candidateObject.uId = i+1;
                candidatesArray.push(candidateObject);
            }
            return candidatesArray;
        };

    }
})()
