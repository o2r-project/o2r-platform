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
        vm.substituteOptions = getSubstituteOptions;
        vm.publication = erc;
        // vm.initSubstitution = initiateSubstitution(); //TODO: to implement

        $scope.selectedSubstitutionFiles = [];

        $scope.$on('loadedSimilarComps', function(event, data){ //similarPubs will be set to comp_meta from metadata factory
            vm.similarPubs = data;
        });

        $scope.toggleSubstitutionFile = function(file, selected) {
          if (file && selected == undefined) {console.log("undefined ---");}

          if (file && selected != undefined) {

              var idx = selected.indexOf(file);
              if (idx > -1) {
                  selected.splice(idx, 1);
              }
              else {
                  selected.push(file);
              }
          }
        };

        $scope.exists = function(file, selected) {
            if (file && selected == undefined) {console.log("undefined ---");}

            if (file && selected != undefined) {
                return selected.indexOf(file) > -1;
            }
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        //////////////////

        function getMetadataSimComp(){
            if(metadataSimComp.status == 404){
                return false;
            }
            return substituteInfoService; // metadataSimComp.callMetadata_simComp;
        }

        function getSubstituteOptions(event, pub) {
            logger.info("base and overlay ERC choosen for substitution");
            //vm.selectedSubstitutionFiles = [];  // TODO: maybe not necessary to be always empty -- how about examples for user?
            vm.base = vm.publication;
            vm.overlay = pub;

            // TODO: put filenames relevant for substitution in array
            vm.basefiles = getFileCandidates(vm.base);
            vm.overlayfiles = getFileCandidates(vm.overlay);
            // var files01 = ["text.csv", "main.Rmd", "data.txt", ["hallo.txt", "jojo"]];
            // var files02 = ["text.txt", "main.Rmd", "timeseries.csv", "Dockerfile"];
            //
            // vm.basefiles = getFileCandidates(files01);
            // vm.overlayfiles = getFileCandidates(files02);

            $mdDialog.show({
                contentElement: '#showCandidateView',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: false
            });
        };

        //TODO: to implement
        function getFileCandidates(pub) {
            // var filePath = pub.files.path;
            var filesArray = [];
            var candidatesArray = [];

            for (let i; i< pub.files.children.length; i++) {
              console.log(pub.files.children[i]);
              if (Array.isArray(pub.files.children[i])) {
                filesArray = pub.files.children[i];
              }
            }

            for (let j; j<filesArray.length; j++) {
                if (Array.isArray(filesArray[i]) || (filesArray[i].extension != "" || ".yml")) {
                    candidatesArray.push(filesArray[i]);
                }
            }
            console.log("candidatesArray");
            console.log(candidatesArray);
        };

        // TODO: to implement
        // function initiateSubstitution() {
        //     var selectedFiles = $scope.selectedSubstitutionFiles;
        //     if (selectedFiles != undefined || selectedFiles.length == 0) {
        //         logger.info("init substitution");
        //     } else {
        //         logger.info("no substitution files choosen");
        //     }
        // };

    }
})()
