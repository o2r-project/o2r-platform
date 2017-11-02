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
        // $scope.filePairs = []; // = filePairsForSubstitution;
        // $scope.ngRepeatCounter = 0;

        vm.substituteOptions = getSubstituteOptions;

        $scope.baseType = "base";
        $scope.overlayType = "overlay";

        $scope.substitutionRows = [{}];
        $scope.baseCandidates = [];
        $scope.overlayCandidates = [];
        $scope.selectedSubstitutionFiles = [];

        $scope.delDropdown = delDropdown;
        $scope.addDropdown = addDropdown;


        var substERCtitleWidth = $("#substitutionErcSelectionViewTitle").context.body.clientWidth;
        vm.divWidth = parseInt((substERCtitleWidth/100 + 5), 10);

        //////////////////

        $scope.$on('loadedSimilarComps', function(event, data){ //similarPubs will be set to comp_meta from metadata factory
            vm.similarPubs = data;
        });

        // $scope.toggleSubstitutionFile = function(file, selected, ngCounter) {
        //   if (file && selected == undefined) {console.log("undefined ---");}
        //
        //   if (file && selected != undefined) {
        //     console.log("toggleSubstitutionFile");
        //     console.log(file);
        //     console.log(selected);
        //     console.log(ngCounter);
        //
        //       var idx = selected.indexOf(file);
        //       if (idx > -1) {
        //           selected.splice(idx, 1);
        //       }
        //       else {
        //           selected.push(file);
        //       }
        //   }
        // };
        //
        // $scope.exists = function(file, selected) {
        //     if (file && selected == undefined) {console.log("undefined ---");}
        //
        //     if (file && selected != undefined) {
        //         return selected.indexOf(file) > -1;
        //     }
        // };

        $scope.cancel = function() {
            $scope.substitutionRows = [{}];
            // $scope.baseCandidates = [];
            // $scope.overlayCandidates = [];
            // $scope.selectedSubstitutionFiles = [];

            $mdDialog.hide();
            // $mdDialog.cancel();
        };

        // TODO: start substitution UI
        $scope.startSubstitutionUI = function() {
            console.log("initiateSubstitution");
            logger.info("initiateSubstitution");
            window.alert("substitute clicked!");

            console.log("$scope.substitutionRows");
            console.log($scope.substitutionRows);

            if (!Array.isArray($scope.substitutionRows) || $scope.substitutionRows == undefined || $scope.substitutionRows.length == 0 || !checkForFiles($scope.substitutionRows)) {
                window.alert("please choose files");
            } else {

            }

            // var selectedFiles = $scope.selectedSubstitutionFiles;
            // if (selectedFiles != undefined || selectedFiles.length == 0) {
            //     logger.info("init substitution");
            // } else {
            //     logger.info("no substitution files choosen");
            // }
        };

        // on change of dropdown list
        $scope.selectSubstitutionFiles = function(file, type, row) {
            // console.log(file);
            // console.log(file.name);
            // console.log(type);
            // console.log(row);
            // console.log($scope.substitutionRows);

            let i = row.$index;
            if (type == "base") {
                $scope.substitutionRows[i].basefile = file;
            }
            if (type == "overlay") {
                $scope.substitutionRows[i].overlayfile = file;
            }
            console.log($scope.substitutionRows);
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
        };

        function checkForFiles(array) {
          // true = contains files
          // false = no files

            if (Array.isArray(array)) {
                for (let i=0; i<array.length; i++) {
                    if (typeof(array[i].basefile) != "object" || typeof(array[i].overlayfile) != "object") {
                        return false;
                    }
                }
                return true;
            }
            return false;
        };

        // function to provide files for substitution as candidates
        function getSubstituteOptions(event, pub) {
            logger.info("base and overlay ERC choosen for substitution");
            //vm.selectedSubstitutionFiles = [];  // TODO: maybe not necessary to be always empty -- how about examples for user?
            vm.base = vm.publication;
            vm.overlay = pub;
            // console.log(vm);
            $scope.filePairs = [];
            $scope.baseCandidates = [];
            $scope.overlayCandidates = [];

            // TODO: put filenames relevant for substitution in array
            vm.basefiles = getFileCandidates(vm.base);
            vm.overlayfiles = getFileCandidates(vm.overlay);

            $scope.baseCandidates = getFileCandidates(vm.base);
            $scope.overlayCandidates = getFileCandidates(vm.overlay);

            console.log("baseCandidates");
            console.log($scope.baseCandidates);
            console.log("overlayCandidates");
            console.log($scope.overlayCandidates);

            // var files01 = ["text.csv", "main.Rmd", "data.txt", ["hallo.txt", "jojo"]];
            // var files01 = ["text.csv", "main.Rmd", "data.txt", "jojo"];
            // var files02 = ["text.txt", "main.Rmd", "timeseries.csv", "Dockerfile"];
            //
            // var thisArray = [];
            //
            // var candidate01 = new substitutionCandidate(files01[0], files02[2]);
            // var candidate02 = new substitutionCandidate(files01[2], files02[0]);
            // var candidate03 = new substitutionCandidate(files01[1], files02[3]);
            // $scope.filePairs.push(candidate01);
            // // $scope.filePairs.push(candidate02);
            // // $scope.filePairs.push(candidate03);
            // console.log($scope.filePairs);

            // vm.basefiles = getFileCandidates(files01);
            // vm.overlayfiles = getFileCandidates(files02);

            $mdDialog.show({
                contentElement: '#showCandidateView',
                parent: angular.element(document.body),
                scope: $scope,
                multiple: false,
                targetEvent: event,
                clickOutsideToClose: false
            });
        };

        // function filePairsForSubstitution() {
        //   console.log("filePairsForSubstitution");
        // }

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
            return candidatesArray;
        };



        function delDropdown(row) {
            var i = row.$index;
            $scope.substitutionRows.splice(i, 1);
        };

        function addDropdown() {
            $scope.substitutionRows.push({});
        };

    }
})()
