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
        $scope.baseType = "base";
        $scope.overlayType = "overlay";
        $scope.substitutionRows = [{}];
        $scope.baseCandidates = [];
        $scope.overlayCandidates = [];
        $scope.selectedSubstitutionFiles = [];
        $scope.delDropdown = delDropdown;
        $scope.addDropdown = addDropdown;

        // set width of div with ERC title in selection list
        var substERCtitleWidth = $("#substitutionErcSelectionViewTitle").context.body.clientWidth;
        vm.divWidth = parseInt((substERCtitleWidth/100 + 10), 10);

        //////////////////

        $scope.$on('loadedSimilarComps', function(event, data){
            // similarPubs will be set to comp_meta from metadata factory
            vm.similarPubs = data;
        });

        $scope.cancel = function() {
            $scope.substitutionRows = [{}];
            $mdDialog.cancel();
        };

        // TODO: start substitution UI
        $scope.startSubstitutionUI = function() {
            logger.info("initiateSubstitution");
            logger.debug("initiateSubstitution");

            if (!Array.isArray($scope.substitutionRows) || $scope.substitutionRows == undefined || $scope.substitutionRows.length == 0 || !checkForFiles($scope.substitutionRows)) {
                logger.info("no substitution files choosen");
                window.alert("please choose files");
            } else {
                $mdDialog.hide();
                logger.info("init substitution");
                // start substitution

                let substitutionMetadata = {};
                let arrayOfSubstitutionObjects = [];


                console.log($scope.substitutionRows);
                console.log(vm.base);
                console.log(vm.overlay);

                substitutionMetadata.base = vm.base.id;
                substitutionMetadata.overlay = vm.overlay.id;
                substitutionMetadata.substitutionFiles = [];

                for (let i=0; i<$scope.substitutionRows.length; i++) {
                  let object_ = {};
                  object_.base = $scope.substitutionRows[i].basefile.filePath;
                  object_.overlay = $scope.substitutionRows[i].overlayfile.filePath;
                  substitutionMetadata.substitutionFiles.push(object_);
                }

                console.log(substitutionMetadata);

                httpRequests.substitute(substitutionMetadata)
                  .then(function(res){
                      console.log(res);
                  })
                  .catch(function(err){
                    console.log(err);
                  });
            }
        };

        // on change of dropdown list
        $scope.selectSubstitutionFiles = function(file, type, row) {
            let i = row.$index;
            let baseCandidatesLength = $scope.baseCandidates.length;
            let overlayCandidatesLength = $scope.overlayCandidates.length;
            let oldBaseCandidatePosition; // = $scope.substitutionRows[i].basefile.$$mdSelectId;
            let newBaseCandidatePosition;
            let oldOverlayCandidatePosition; // = $scope.substitutionRows[i].overlayfile.$$mdSelectId;
            let newOverlayCandidatePosition;

            // change "selected" to TRUE of new file
            if (type == "base") {
                newBaseCandidatePosition = file.$$mdSelectId;
                // $$mdSelectId will add up all files that have been inside of md-select (when cancelling md-dialog and open again)
                while (newBaseCandidatePosition > (baseCandidatesLength + overlayCandidatesLength)) {
                    newBaseCandidatePosition = newBaseCandidatePosition - (baseCandidatesLength + overlayCandidatesLength);
                }
                // change "selected" to FALSE of exchanged file
                if ($scope.substitutionRows[i].basefile != undefined) {
                    oldBaseCandidatePosition = $scope.substitutionRows[i].basefile.$$mdSelectId;
                    $scope.baseCandidates[oldBaseCandidatePosition-1].selected = false;
                }
                $scope.substitutionRows[i].basefile = file;
                $scope.baseCandidates[newBaseCandidatePosition-1].selected = true;
            }
            if (type == "overlay") {
                newOverlayCandidatePosition = file.$$mdSelectId;
                // $$mdSelectId will add up all files that have been inside of md-select (when cancelling md-dialog and open again)
                while (newOverlayCandidatePosition > (baseCandidatesLength + overlayCandidatesLength)) {
                    newOverlayCandidatePosition = newOverlayCandidatePosition - (baseCandidatesLength + overlayCandidatesLength);
                }
                // change "selected" to FALSE of exchanged file
                if ($scope.substitutionRows[i].overlayfile != undefined) {
                    oldOverlayCandidatePosition = $scope.substitutionRows[i].overlayfile.$$mdSelectId;
                    $scope.overlayCandidates[oldOverlayCandidatePosition-1-baseCandidatesLength].selected = false;
                }
                $scope.substitutionRows[i].overlayfile = file;
                $scope.overlayCandidates[newOverlayCandidatePosition-1-baseCandidatesLength].selected = true;
            }
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
          // true = contains files , false = no files
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
            vm.base = vm.publication;
            vm.overlay = pub;

            if (vm.base.metadata.o2r.inputfiles.length < 1 || vm.overlay.metadata.o2r.inputfiles.length < 1) {
                logger.info("no inputfiles for substitution");
                logger.debug("no inputfiles for substitution");
                window.alert("no substitution possible");
            } else {
                $scope.filePairs = [];
                $scope.baseCandidates = [];
                $scope.overlayCandidates = [];

                // put filenames relevant for substitution in array
                vm.basefiles = getFileCandidates(vm.base);
                vm.overlayfiles = getFileCandidates(vm.overlay);

                $scope.baseCandidates = getFileCandidates(vm.base);
                $scope.overlayCandidates = getFileCandidates(vm.overlay);

                $mdDialog.show({
                    contentElement: '#showCandidateView',
                    parent: angular.element(document.body),
                    scope: $scope,
                    preserveScope: true,
                    multiple: false,
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
                candidatesArray.push(candidateObject);
            }
            return candidatesArray;
        };

        function delDropdown(row) {
            var i = row.$index;
            if ($scope.substitutionRows.length <= 1) {
                // TODO: button in red to warn
            } else {
              $scope.substitutionRows.splice(i, 1);
            }
        };

        function addDropdown() {
          if ($scope.substitutionRows.length <= $scope.baseCandidates.length && $scope.substitutionRows.length <= $scope.overlayCandidates) {
              $scope.substitutionRows.push({});
          } else {
              // TODO: button in red to warn
          }
        };

    }
})()
