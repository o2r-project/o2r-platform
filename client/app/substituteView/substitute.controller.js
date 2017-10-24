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
        $scope.filePairs = []; // = filePairsForSubstitution;

        var substERCtitleWidth = $("#substitutionErcSelectionViewTitle").context.body.clientWidth;
        vm.divWidth = parseInt((substERCtitleWidth/100 + 5), 10);

        //////////////////

        $scope.selectedSubstitutionFiles = [];

        $scope.$on('loadedSimilarComps', function(event, data){ //similarPubs will be set to comp_meta from metadata factory
            vm.similarPubs = data;
        });

        $scope.toggleSubstitutionFile = function(file, selected) {
          if (file && selected == undefined) {console.log("undefined ---");}

          if (file && selected != undefined) {
            console.log("toggleSubstitutionFile");
            console.log(file);
            console.log(selected);

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

        // TODO: start substitution UI
        $scope.startSubstitutionUI = function() {
          console.log("initiateSubstitution");
          logger.info("initiateSubstitution");
          window.alert("substitute clicked!");
          // var selectedFiles = $scope.selectedSubstitutionFiles;
          // if (selectedFiles != undefined || selectedFiles.length == 0) {
          //     logger.info("init substitution");
          // } else {
          //     logger.info("no substitution files choosen");
          // }
        };

        //////////////////

        function substitutionCandidate(basefile, overlayfile) {
            this.basefile = basefile;
            this.overlayfile = overlayfile;
        };



        function getMetadataSimComp(){
            if(metadataSimComp.status == 404){
                return false;
            }
            return substituteInfoService; // metadataSimComp.callMetadata_simComp;
        }

        // function to provide files for substitution as candidates
        function getSubstituteOptions(event, pub) {
            logger.info("base and overlay ERC choosen for substitution");
            //vm.selectedSubstitutionFiles = [];  // TODO: maybe not necessary to be always empty -- how about examples for user?
            vm.base = vm.publication;
            vm.overlay = pub;
            console.log(vm);

            // TODO: put filenames relevant for substitution in array
            console.log("start: getFileCandidates(vm.base)");
            vm.basefiles = getFileCandidates(vm.base);
            console.log("end: getFileCandidates(vm.base)");
            // vm.overlayfiles = getFileCandidates(vm.overlay);
            var files01 = ["text.csv", "main.Rmd", "data.txt", ["hallo.txt", "jojo"]];
            var files02 = ["text.txt", "main.Rmd", "timeseries.csv", "Dockerfile"];

            var candidate;
            var thisArray = [];

            candidate = new substitutionCandidate(files01[0], files02[2]);
            $scope.filePairs.push(candidate);
            console.log($scope.filePairs);
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

        function filePairsForSubstitution() {
          console.log("filePairsForSubstitution");
        }

        //TODO: to implement
        function getFileCandidates(pub) {
            var candidatesArray = [];
            var filesArray;
            var thisArray = pub.files.children;
            for (let i=0; i<thisArray.length; i++) {
                if (pub.files.children[i].children && Array.isArray(pub.files.children[i].children)) {
                    filesArray = pub.files.children[i];
                    i = thisArray.length-1;
                }
            };
            filesArray = filesArray.children;
            for (let j=0; j<filesArray.length; j++) {
                if (Array.isArray(filesArray[j].children) || (filesArray[j].extension == undefined) || (filesArray[j].extension == null)) {
                } else {
                  candidatesArray.push(filesArray[j]);
                }
            };
            console.log("tadaa -- candidatesArray");
            console.log(candidatesArray);


        };


    }
})()
